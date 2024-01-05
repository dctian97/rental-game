import { Table, Space, Tag } from 'antd';
import DeleteGame from './DeleteGame';
import { Link } from 'react-router-dom';

export default function GameTable({ games }) {
    
    return (
        <Table dataSource={games} rowKey={games.ゲームid}>
            <Table.Column title="タイトル" dataIndex="タイトル" key={games.タイトル} />
            <Table.Column title="プラットフォーム" dataIndex="プラットフォーム" key={games.プラットフォーム} />
            <Table.Column 
                title="在庫数" 
                dataIndex="在庫数" 
                key={games.在庫数}
                sorter={(a, b) => a.在庫数 - b.在庫数}
            />
            <Table.Column 
                title="価格(円)" 
                dataIndex="金額" 
                key={games.金額}
                sorter={(a, b) => a.金額 - b.金額}
            />
            <Table.Column
                title="操作"
                key="action"
                render={(_, record) => 
                <Space size="middle">
                    <Tag color="blue">
                        <Link to={`/home/update-game/${record.ゲームid}`}>更新</Link>
                </Tag>
                    <DeleteGame record={record} />
              </Space>}
            />
            
        </Table>
    );
}
