import React from 'react';
import { useState, useEffect } from "react";
import { Popover, Image, Layout, Menu, theme, Button, Flex, Card, Col, Row, Space, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { IoLogoGameControllerB, IoLogoPlaystation } from "react-icons/io";
import { IoLogoXbox } from "react-icons/io";
import { BsNintendoSwitch } from "react-icons/bs";
import { CheckOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const items = [
  {
    key: 0,
    label: "All",
  },
  {
    key: 1,
    label: "PlayStation",
    icon: <IoLogoPlaystation/>
  },
  {
    key: 2,
    label: "Nintendo Switch",
    icon: <BsNintendoSwitch />
  },
  {
    key: 3,
    label: "Xbox",
    icon: <IoLogoXbox />
  }
];
const text = <span>カート</span>;


const MyButton = ({ game, onAddToCart }) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    onAddToCart(game);
  };
  return (
    <Button
      type='primary'
      icon={clicked ? <CheckOutlined /> : null}
      onClick={handleClick}
      disabled={clicked}
      style={{ marginBottom: 10 }}
    >
      {clicked ? '成功' : 'カートに入れる'}
    </Button>
  );
};

const App = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const [games, setGames] = useState([])
  const [filteredGames, setFilteredGames] = useState([]);
  const [addCart, setAddCart] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const addToCart = (game) => {
    setAddCart([...addCart, game]);
  };
  const removeFromCart = (index) => {
    setAddCart(addCart.filter((_, i) => i !== index));
  };
  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    localStorage.removeItem('username');  
    setIsLoggedIn(false);                
    setUsername('');                     
  };
  const handleCheckout = async () => {
    const username = localStorage.getItem('username');
    const checkoutData = addCart.map(item => ({
      氏名: username,
      タイトル: item.タイトル
    }));
  
    try {
      const response = await fetch('http://127.0.0.1:5000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData)
      });
      if (response.ok) {
        window.location.reload();
    } else {
        console.error('Server responded with non-OK status');
    }
    } catch (error) {
      console.error('error:', error);
    }
  };
  const cartContent = (
    <div>
      {addCart.map((item, index) => (
        <p key={index}>{item.タイトル} <DeleteOutlined style={{color:"red"}} onClick={() => removeFromCart(index)}/></p>
      ))}
      {addCart.length > 0 && (
          <Button 
            type="primary" 
            style={{ marginTop: 10, width: '100%' }}
            onClick={() => handleCheckout()}
          >
            会計
          </Button>
      )}
    </div>
  );
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);
  const handleMenuClick = (e) => {
    if (e.key === '1') {
      setFilteredGames(games.filter(game => game.プラットフォーム === 'PS5' || game.プラットフォーム === 'PS4'));
    } else if (e.key === '2') {
      setFilteredGames(games.filter(game => game.プラットフォーム === 'Nintendo Switch'));
    } else if (e.key === '3') {
      setFilteredGames(games.filter(game => game.プラットフォーム === 'Xbox S' || game.プラットフォーム === 'Xbox one'));
    } else {
      setFilteredGames(games);
    }
  };
  
  useEffect(() => {
    (async () => {
        try {
            const response = await fetch("/.netlify/functions/gamelist");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setGames(data);
            setFilteredGames(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    })();
  }, []);
  return (
    <Layout >
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IoLogoGameControllerB 
          style={{color:"white", scale:"3"}}/>
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={handleMenuClick}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
            margin:50,
          }}
        />
        <Flex gap="small" wrap="wrap">
        {!isLoggedIn ? (
            <>
              <Button type="primary"><Link to="/Login">ログイン</Link></Button>
              <Button><Link to="/Register">新規登録</Link></Button>
            </>
          ) : (
            <>
              <span style={{color:"white"}}>ようこそ, {username}!</span>
              <Button style={{margin:"auto"}} onClick={handleLogout}>ログアウト</Button>
            </>
          )}
          <Popover placement="bottom" title={text} content={cartContent}>
          <ShoppingCartOutlined style={{scale:"2", color:"white", margin:10}}/>
          </Popover>
        </Flex>
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
          <Card title="商品" style={{
            margin: 20,
            padding: 24,
            minHeight: 600,
            background: "#fafafa",
            borderRadius: borderRadiusLG,
          }}>
            <Row gutter={16}>
            {filteredGames.map((game, index) => (
              <Col key={index} span={5} style={{ margin: 10 }}>
              <Card
                title={game.タイトル}
                bordered={false}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between', 
                  height: '100%',
                }}
              >
                <div style={{ marginBottom: 10 }}> 
                  <Image
                    width={100}
                    height={150}
                    src={`/images/${game.ゲームid}.jpg`}
                  />
                </div>
                <div style={{color:'orange', fontSize:"24px"}}>¥{game.金額}</div>
                <p>在庫：{game.在庫数}</p>
                <MyButton game={game} onAddToCart={addToCart} />
                <div>
                  <Space size={[0, 'small']}> 
                    <Tag bordered={false} color="processing">
                      {game.プラットフォーム}
                    </Tag>
                    <Tag bordered={false} color="success">
                      {game.デベロッパー}
                    </Tag>
                  </Space>
                </div>
              </Card>
            </Col>
            
              ))}
            </Row>
          </Card>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        日本大学文理学部 ©2023 Created by 5420045 党チンテン
      </Footer>
    </Layout>
  );
};
export default App;
