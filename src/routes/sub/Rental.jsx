import { useState, useEffect } from "react";
import React from "react";
import { Input, Button, Card, Table, Space, Tag } from "antd";
import { Link } from 'react-router-dom';

export default function Rental() {
    const [rentals, setRentals] = useState([]);
    const [filteredRentals, setFilteredRentals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filteredData = rentals.filter(rental =>
            Object.values(rental).some(
                value => value && value.toString().toLowerCase().includes(lowercasedQuery)
            )
        );
        setFilteredRentals(filteredData);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("/.netlify/functions/rentallist");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRentals(data);
                setFilteredRentals(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        })();
    }, []);

    return (
        <>
            <div style={{ height: "100px", display: "flex", alignItems: "center" }}>
                <Input 
                    allowClear={true}
                    placeholder="内容を入力してください"
                    style={{ width: "200px", margin: "0 20px" }}
                    onChange={e => setSearchQuery(e.target.value)}>
                </Input>
                <Button onClick={handleSearch}>検索</Button>
            </div>
            <Card
                title="貸出リスト"
                style={{ width: "100%" }}
            >
                <Table dataSource={filteredRentals} rowKey="貸出id">
                    <Table.Column title="ゲーム" dataIndex="タイトル" key="タイトル" />
                    <Table.Column title="貸出人" dataIndex="氏名" key="氏名" />
                    <Table.Column title="貸出日" dataIndex="貸出日" key="貸出日" sorter={(a, b) => new Date(a.貸出日) - new Date(b.貸出日)}/>
                    <Table.Column title="返却予定日" dataIndex="返却予定日" key="返却予定日" sorter={(a, b) => new Date(a.返却予定日) - new Date(b.返却予定日)}/>
                    <Table.Column title="実際返却日" dataIndex="実際の返却日" key="実際の返却日" sorter={(a, b) => new Date(a.実際の返却日) - new Date(b.実際の返却日)}/>
                    <Table.Column
                        title="操作"
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <Tag color="blue">
                                    <Link to={`/home/update-rental/${record.貸出id}`}>更新</Link>
                                </Tag>
                            </Space>
                        )}
                    />
                </Table>
            </Card>
        </>
    );
}
