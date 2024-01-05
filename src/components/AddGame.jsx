import React, { useState } from 'react';
import { Button, Form, Input, message, DatePicker, InputNumber, Card, Col, Row} from 'antd';
import { Link } from 'react-router-dom';

export default function AddGameForm() {
    const [form] = Form.useForm();
        const [gameData, setGameData] = useState({
            ゲームid: '',
            タイトル: '',
            発売日: '',
            デベロッパー: '',
            プラットフォーム: '',
            金額: '',
            在庫数: ''
        });
        const handleChange = (name, value) => {
            setGameData({ ...gameData, [name]: value });
        };
        const handleDateChange = (dateString) => {
            handleChange('発売日', dateString);
        };
    
        const handleAmountChange = (value) => {
            handleChange('金額', value);
        };
        const handleSubmit = async (event) => {
            event.preventDefault();
                try {
                    const response = await fetch('http://127.0.0.1:5000/add-game', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(gameData)
                    });
        
                    if (response.ok) {
                        message.success("新しいゲームが追加されました");
                        form.resetFields();
                    } else {
                        message.error("エラーが発生しました");
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
        };
    return (
        <Card
            title="ゲームの追加フォーム"
            extra={<Link to={"/home/gamelist"}>戻る</Link>}
            style={{
                width: "100%",
            }}
            >
            <Row>
                <Col span={12}>
                    <Form
                        layout="vertical"
                        form={form}
                        style={{width:"400px"}}
                        initialValues={gameData}>
                        <Form.Item label="ゲームid" required>
                            <Input name="ゲームid" placeholder="ゲームid" onChange={e => handleChange('ゲームid', e.target.value)} value={gameData.ゲームid} />
                        </Form.Item>      
                        <Form.Item label="タイトル" required>
                            <Input name="タイトル" placeholder="タイトル" onChange={e => handleChange('タイトル', e.target.value)} value={gameData.タイトル} />
                        </Form.Item>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="発売日">
                                    <DatePicker format="YYYY-MM-DD" onChange={handleDateChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="金額" required>
                                    <InputNumber
                                        formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/¥\s?|(,*)/g, '')}
                                        onChange={handleAmountChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>                        
                        <Form.Item label="デベロッパー">
                            <Input name="デベロッパー" placeholder="任天堂など" onChange={e => handleChange('デベロッパー', e.target.value)} value={gameData.デベロッパー} />
                        </Form.Item>
                        <Form.Item label="プラットフォーム" required>
                            <Input name="プラットフォーム" placeholder="PS5など" onChange={e => handleChange('プラットフォーム', e.target.value)} value={gameData.プラットフォーム} />
                        </Form.Item>
                        <Form.Item label="在庫数" required>
                            <Input name="在庫数" placeholder="在庫数" onChange={e => handleChange('在庫数', e.target.value)} value={gameData.在庫数} />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" onClick={handleSubmit}>ゲームデータ送信</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}
