import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Form, DatePicker, Card, Col, Row} from 'antd';
const UpdateRental = () => {
    const {rentalId} = useParams();
    const [form] = Form.useForm();
        const [rentalData, setRentalData] = useState({
            貸出日: '',
            返却予定日: '',
            実際の返却日: '',
        });
        const handleChange = (name, value) => {
            setRentalData({ ...rentalData, [name]: value });
        };

        const handleDateChange = (dateString) => {
            handleChange('貸出日', dateString);
        };
        const handleBackDateChange = (dateString) => {
            handleChange('返却予定日', dateString);
        };
        const handleRealBackDateChange = (dateString) => {
            handleChange('実際の返却日', dateString);
        };

        const handleUpdate = async () => {
            if (window.confirm(`貸出ID ${rentalId} を更新してもよろしいですか？`)) {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/update-rental/${rentalId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(rentalData)
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
            title={`レンタルの更新フォーム`}
            extra={<Link to={"/home/rental"}>戻る</Link>}
            style={{
                width: "100%",
            }}>
            <Row>
                <Col span={12}>
                    <Form
                        layout="vertical"
                        form={form}
                        style={{width:"400px"}}
                        initialValues={rentalData}>  
                        <Form.Item label="貸出日">
                            <DatePicker format="YYYY-MM-DD" onChange={handleDateChange} />
                        </Form.Item>
                        <Form.Item label="返却予定日">
                            <DatePicker format="YYYY-MM-DD" onChange={handleBackDateChange} />
                        </Form.Item> 
                        <Form.Item label="実際の返却日">
                            <DatePicker format="YYYY-MM-DD" onChange={handleRealBackDateChange} />
                        </Form.Item>  
                        <Form.Item >
                            <Button type="primary" onClick={handleUpdate}>レンタルデータ送信</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}

export default UpdateRental;