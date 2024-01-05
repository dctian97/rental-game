import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Card, Col, Row} from 'antd';
const UpdateUser = () => {
    const {userId} = useParams();
    const [form] = Form.useForm();
        const [userData, setUserData] = useState({
            氏名: '',
            住所: '',
            電話番号: '',
            メールアドレス: '',
            加入日: '',
        });
        const [changedData, setChangedData] = useState({});

        const handleChange = (name, value) => {
            setUserData({ ...userData, [name]: value });
            setChangedData({ ...changedData, [name]: value });
        };

        const handleDateChange = (dateString) => {
            handleChange('加入日', dateString);
        };

        const handleUpdate = async () => {
            if (window.confirm(`ユーザーID ${userId} を更新してもよろしいですか？`)) {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/update-user/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData)
                    });
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        console.error('Server responded with non-OK status');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
        

    return (
        <Card
            title={`ユーザーの更新フォーム`}
            extra={<Link to={"/home/user"}>戻る</Link>}
            style={{
                width: "100%",
            }}>
            <Row>
                <Col span={12}>
                    <Form
                        layout="vertical"
                        form={form}
                        style={{width:"400px"}}
                        initialValues={userData}>  
                        <Form.Item label="氏名" >
                            <Input name="氏名" placeholder="氏名" onChange={e => handleChange('氏名', e.target.value)} value={userData.氏名} />
                        </Form.Item>              
                        <Form.Item label="住所">
                            <Input name="住所" placeholder="住所" onChange={e => handleChange('住所', e.target.value)} value={userData.住所} />
                        </Form.Item>
                        <Form.Item label="電話番号" >
                            <Input name="電話番号" placeholder="電話番号" onChange={e => handleChange('電話番号', e.target.value)} value={userData.電話番号} />
                        </Form.Item>
                        <Form.Item label="メールアドレス" >
                            <Input name="メールアドレス" placeholder="メールアドレス" onChange={e => handleChange('メールアドレス', e.target.value)} value={userData.メールアドレス} />
                        </Form.Item>
                        <Form.Item label="加入日">
                            <DatePicker format="YYYY-MM-DD" onChange={handleDateChange} />
                        </Form.Item> 
                        <Form.Item >
                            <Button type="primary" onClick={handleUpdate}>ユーザーデータ送信</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}

export default UpdateUser;