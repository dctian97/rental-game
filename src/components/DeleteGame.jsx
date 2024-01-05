import React from 'react';
import { Tag } from 'antd';
const DeleteGame = ({ record }) => {
    const handleDelete = async (gameId) => {
    if (window.confirm(`ゲームID ${gameId} を削除してもよろしいですか？`)) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/gamelist/${gameId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                window.location.reload()
            } else {
                // エラー処理
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
  };

  return (
      <Tag color="red" onClick={() => handleDelete(record.ゲームid)}>
        <a>削除</a>
      </Tag>
  );
};

export default DeleteGame;
