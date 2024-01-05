import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, theme, FloatButton } from 'antd';
import jaJP from 'antd/lib/locale/ja_JP';
import MyBreadcrumb from '../components/MyBreadcrumb';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/home">ホーム</Link>, '/home', <DesktopOutlined />),
  getItem(<Link to="/home/user">ユーザー管理</Link>, '/home/user', <UserOutlined />),
  getItem(<Link to="/home/gamelist">ゲームリスト</Link>, '9', <UnorderedListOutlined />),
  getItem(<Link to="/home/rental">貸出リスト</Link>, '/home/rental', <FileOutlined />),
];
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider locale={jaJP}>
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <MyBreadcrumb />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
            <Link to={"/"}><FloatButton tooltip={<div>商品ページへ戻る</div>} /></Link>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          日本大学文理学部 ©2023 Created by 5420045 党チンテン
        </Footer>
      </Layout>
    </Layout>
    </ConfigProvider>
  );
};
export default Home;