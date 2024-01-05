
import psycopg2
from flask import Flask, jsonify, request
from flask_cors import CORS

from config import conn_info

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/gamelist', methods=['GET'])
def get_games():
    # データベースに接続
    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()

    cur.execute('''
            SELECT ゲームデータ.* FROM ゲームデータ
            ''')
    games = cur.fetchall()
    games_list = [{'ゲームid': row[0], 'タイトル': row[1], '発売日': row[2].strftime('%Y-%m-%d'), 'デベロッパー': row[3], '金額': row[4], 'プラットフォーム': row[5], '在庫数': row[6]} for row in games]
    cur.close()
    conn.close()

    return jsonify(games_list)
@app.route('/userlist', methods=['GET'])
def get_users():
    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()

    cur.execute('''
            SELECT * FROM ユーザー
            ''')
    users = cur.fetchall()
    users_list = [{'氏名': row[0], '住所': row[1], '電話番号': row[2], 'メールアドレス': row[3], '加入日': row[4].strftime('%Y-%m-%d'), 'ユーザーid': row[5]} for row in users]
    cur.close()
    conn.close()

    return jsonify(users_list)

@app.route('/rentallist', methods=['GET'])
def get_rentals():
    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()

    cur.execute('''
            SELECT タイトル, 氏名, 貸出データ.*  FROM 貸出データ
            LEFT JOIN ゲームデータ ゲ on ゲ.ゲームid = 貸出データ.ゲームid
            LEFT JOIN ユーザー ユ on ユ.ユーザーid = 貸出データ.ユーザーid
            ''')
    rentals = cur.fetchall()
    rentals_list = []
    for row in rentals:
        rental = {
            'タイトル': row[0],
            '氏名': row[1],
            '貸出日': row[2].strftime('%Y-%m-%d') if row[2] else None,
            '返却予定日': row[3].strftime('%Y-%m-%d') if row[3] else None,
            '実際の返却日': row[4].strftime('%Y-%m-%d') if row[4] else None,
            '貸出id': row[5]
        }
        rentals_list.append(rental)
    cur.close()
    conn.close()

    return jsonify(rentals_list)
@app.route('/chart', methods=['GET'])
def get_charts():
    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()

    cur.execute('''
            SELECT LEFT(ゲ.タイトル, 13) as タイトル, COUNT(*) as 貸出回数
            FROM 貸出データ
            LEFT JOIN ゲームデータ ゲ ON ゲ.ゲームid = 貸出データ.ゲームid
            GROUP BY ゲ.タイトル;
            ''')
    rentals = cur.fetchall()
    rentals_list = []
    for row in rentals:
        rental = {
            'タイトル': row[0],
            '貸出回数': row[1],
        }
        rentals_list.append(rental)
    cur.close()
    conn.close()

    return jsonify(rentals_list)
@app.route('/gamelist/<int:game_id>', methods=['DELETE'])
def delete_game(game_id):
    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()

    try:
        cur.execute('DELETE FROM ゲームデータ WHERE ゲームid = %s;', (game_id,))
        conn.commit()
        response = {"status": "success", "message": f"ゲームID {game_id} のデータが削除されました"}

    except psycopg2.Error as e:
        conn.rollback()
        response = {"status": "error", "message": str(e)}

    finally:
        cur.close()
        conn.close()

    return jsonify(response)

from datetime import datetime

def convert_date_format(date_str):
    dt = datetime.fromisoformat(date_str.rstrip("Z"))
    return dt.date().isoformat()

@app.route('/update-game/<int:game_id>', methods=['PUT'])
def update_game(game_id):
    game_data = request.json
    filtered_game_data = {key: (convert_date_format(value) if key == '発売日' else value) for key, value in
                          game_data.items() if value != ""}
    set_clause = ', '.join([f"{key} = %s" for key in filtered_game_data])
    values = list(filtered_game_data.values()) + [game_id]
    sql_query = f"UPDATE ゲームデータ SET {set_clause} WHERE ゲームid = %s;"
    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()
    try:
        cur.execute(sql_query, values)
        conn.commit()
        response = {"status": "success", "message": f"ゲームID {game_id} のデータが更新されました"}
    except psycopg2.Error as e:
        conn.rollback()
        response = {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

    return jsonify(response)

@app.route('/update-user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user_data = request.json
    filtered_user_data = {key: (convert_date_format(value) if key == '加入日' else value) for key, value in
                          user_data.items() if value != ""}
    set_clause = ', '.join([f"{key} = %s" for key in filtered_user_data])
    values = list(filtered_user_data.values()) + [user_id]
    sql_query = f"UPDATE ユーザー SET {set_clause} WHERE ユーザーid = %s;"
    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()
    try:
        cur.execute(sql_query, values)
        conn.commit()
        response = {"status": "success", "message": f"ユーザーID {user_id} のデータが更新されました"}
    except psycopg2.Error as e:
        conn.rollback()
        response = {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

    return jsonify(response)

@app.route('/update-rental/<int:rental_id>', methods=['PUT'])
def update_rental(rental_id):
    rental_data = request.json
    filtered_rental_data = {key: (convert_date_format(value) if key == '貸出日' else value) for key, value in
                          rental_data.items() if value != ""}
    set_clause = ', '.join([f"{key} = %s" for key in filtered_rental_data])
    values = list(filtered_rental_data.values()) + [rental_id]
    sql_query = f"UPDATE 貸出データ SET {set_clause} WHERE 貸出id = %s;"
    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()
    try:
        cur.execute(sql_query, values)
        conn.commit()
        response = {"status": "success", "message": f"貸出ID {rental_id} のデータが更新されました"}
    except psycopg2.Error as e:
        conn.rollback()
        response = {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

    return jsonify(response)

@app.route('/add-game', methods=['POST'])
def add_game():
    data = request.json
    game_data = {
        'ゲームid': data['ゲームid'],
        'タイトル': data['タイトル'],
        '発売日': data['発売日'],
        'デベロッパー': data['デベロッパー'],
        '金額': data['金額'],
        'プラットフォーム': data['プラットフォーム'],
        '在庫数': data['在庫数']
    }
    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()

    try:
        cur.execute('''
                INSERT INTO ゲームデータ (ゲームid, タイトル, 発売日, デベロッパー, 金額, プラットフォーム, 在庫数)
                VALUES (%s, %s, %s, %s, %s, %s, %s);
            ''', (game_data['ゲームid'], game_data['タイトル'], game_data['発売日'], game_data['デベロッパー'], game_data['金額'],
                  game_data['プラットフォーム'], game_data['在庫数']))
        conn.commit()
        response = {"status": "success", "message": "新しいゲームが追加されました。"}
    except psycopg2.Error as e:
        conn.rollback()
        response = {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()
    return jsonify(response)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    user_data = {
        '氏名': data['氏名'],
        '住所': data['住所'],
        '電話番号': data['電話番号'],
        'メールアドレス': data['メールアドレス']
    }

    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()

    try:
        cur.execute('''
            INSERT INTO ユーザー (氏名, 住所, 電話番号, メールアドレス, 加入日)
            VALUES (%s, %s, %s, %s, current_date);
        ''', (user_data['氏名'], user_data['住所'], user_data['電話番号'], user_data['メールアドレス']))
        conn.commit()
        response = {"status": "success", "message": "成功しました。"}
    except psycopg2.Error as e:
        conn.rollback()
        response = {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

    return jsonify(response)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user_data = {
        '氏名': data['氏名'],
        'メールアドレス': data['メールアドレス']
    }

    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()

    try:
        cur.execute("SELECT 氏名, メールアドレス FROM ユーザー WHERE 氏名 = %s AND メールアドレス = %s", (user_data['氏名'], user_data['メールアドレス']))
        user = cur.fetchone()
        if user:
            token = "fake-jwt-token-for-demo"
            return jsonify({'status': 'success', 'token': token})
        else:
            return jsonify({'status': 'error', 'message': 'ユーザーが存在しません。'}), 401
    except psycopg2.Error as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()


@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.json
    conn = psycopg2.connect(**conn_info)
    cur = conn.cursor()

    try:
        for item in data:
            cur.execute("SELECT ユーザーid FROM ユーザー WHERE 氏名 = %s", (item['氏名'],))
            user_row = cur.fetchone()
            user_id = user_row[0]

            cur.execute("SELECT ゲームid FROM ゲームデータ WHERE タイトル = %s", (item['タイトル'],))
            game_row = cur.fetchone()
            game_id = game_row[0]

            cur.execute('''
                INSERT INTO 貸出データ (貸出日, ユーザーid, ゲームid) 
                VALUES (CURRENT_DATE, %s, %s);
            ''', (user_id, game_id))
        conn.commit()
        return jsonify({'status': 'success', 'message': '成功'})
    except (psycopg2.Error, ValueError) as e:
        conn.rollback()
        return jsonify({'status': 'error', 'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()
if __name__ == '__main__':
    app.run(debug=True)