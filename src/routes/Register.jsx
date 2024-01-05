import React from 'react';
import {
    Button,
    Form,
    Input,
} from 'antd';
const formItemLayout = {
    labelCol: {
        xs: {
        span: 24,
        },
        sm: {
        span: 8,
        },
    },
    wrapperCol: {
        xs: {
        span: 24,
        },
        sm: {
        span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: 16,
        offset: 8,
        },
    },
};
const Register = () => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    氏名: values.nickname,
                    住所: values.address,
                    電話番号: values.phone,
                    メールアドレス: values.email,
                })
            });
    
            if (response.ok) {
                message.success("新しいユーザーが追加されました");
                form.resetFields();
            } else {
                message.error("エラーが発生しました");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "600px",
            margin: "auto",
            height: "700px"
        }}
        scrollToFirstError
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
            name="address"
            label="住所"
            rules={[
            {
                required: true,
                message: '住所を入力してください!',
            },
            ]}
        >
            <Input
            style={{
                width: '100%',
            }}
            />
        </Form.Item>
        <Form.Item
            name="phone"
            label="電話番号"
            rules={[
            {
                required: true,
                message: '電話番号を入力してください!',
            },
            ]}
        >
            <Input
            style={{
                width: '100%',
            }}
            />
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
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
            新規登録
            </Button>
        </Form.Item>
        </Form>
    );
};
export default Register;