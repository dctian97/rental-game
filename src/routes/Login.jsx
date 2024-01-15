import React from 'react';
import { Button, Checkbox, Form, Input, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await fetch('/.netlify/functions/userlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          氏名: values.nickname,
          メールアドレス: values.email,
      })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('username', values.nickname);
        if (values.nickname === 'admin' && values.email === 'admin@admin.com') {
          navigate('/home');
        } else {
          navigate('/');
        }
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <Form
      name="名前"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "300px",
        margin: "auto",
        height: "700px"
      }}
    >
      <Form.Item
            name="nickname"
            label="氏名"
            rules={[
            {
                required: true,
                message: '名前を入力してください!',
                whitespace: true,
            },
            ]}
        >
            <Input />
        </Form.Item>
      <Form.Item
            name="email"
            label="メールアドレス"
            rules={[
            {
                type: 'email',
                message: 'メールアドレスエラー!',
            },
            {
                required: true,
                message: 'メールアドレスを入力してください!',
            },
            ]}
        >
            <Input />
        </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>ユーザーを保存</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" className="login-form-button">
            ログイン
          </Button>
          <Link to="/Register">新規登録</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default Login;