import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
    '/home': 'ホーム',
    '/home/game': 'ゲーム',
    '/home/gamelist': 'ゲームリスト',
    '/home/addgame': 'ゲーム追加',
    '/home/update-game': 'ゲーム更新',
    '/home/user': 'ユーザー管理',
    '/home/rental': '貸出リスト',
    '/home/update-rental': '貸出の更新',
    '/home/update-user': 'ユーザー更新'
};
const MyBreadcrumb = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={url}>
            {breadcrumbNameMap[url] || snippet}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default MyBreadcrumb;
