import { useState, useEffect } from "react";
import React from "react";
import { Input, Button, Card, Table, Space, Tag} from "antd";
import { Link } from 'react-router-dom';
export default function User () {
    const [users, setUsers] = useState([]); 
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filteredData = users.filter(user =>
            Object.values(user).some(
                value => value.toString().toLowerCase().includes(lowercasedQuery)
            )
        );
        setFilteredUsers(filteredData);
    };
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("/.netlify/functions/userlist");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data)
            } catch (error) {
                console.error('Fetch error:', error);
            }
        })();
    }, []);
    return (
        <>
            <div style={{ height:"100px", display:"flex", alignItems:"center" }}>
                <Input 
                    allowClear={true}
                    placeholder="内容を入力してください"
                    style={{width:"200px", margin:"0 20px"}}
                    onChange={e => setSearchQuery(e.target.value)}>
                </Input>
                <Button onClick={handleSearch}>検索</Button>
            </div>
            <Card
                title="ユーザーリスト"
                style={{
                    width: "100%",
                }}
                >
                <Table dataSource={filteredUsers} rowKey={users.ユーザーid}>
                    <Table.Column title="氏名" dataIndex="氏名" key={users.氏名} />
                    <Table.Column title="メールアドレス" dataIndex="メールアドレス" key={users.メールアドレス} />
                    <Table.Column 
                        title="住所" 
                        dataIndex="住所" 
                        key={users.住所}
                    />
                    <Table.Column 
                        title="電話番号" 
                        dataIndex="電話番号" 
                        key={users.電話番号}
                    />
                    <Table.Column
                        title="操作"
                        key="action"
                        render={(_, record) => 
                        <Space size="middle">
                            <Tag color="blue">
                                <Link to={`/home/update-user/${record.ユーザーid}`}>更新</Link>
                            </Tag>
                        </Space>}
                    />
                    
                </Table>
            </Card>
        </>
    )
}