import { useState, useEffect } from "react";
import React from "react";
import { Select, Input, Button, Card} from "antd";
import { Link } from 'react-router-dom';
import Table from "./GameTable";

export default function GameList() { 
    const [games, setGames] = useState([]); 
    const [searchType, setSearchType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGames, setFilteredGames] = useState([]);
    const handleSearch = () => {
        if (!searchType || !searchQuery) {
            setFilteredGames(games); 
            return;
        }
        const result = games.filter(game => {
            if (searchType === 'name') {
                return game.タイトル.includes(searchQuery);
            }
            if (searchType === 'platform') {
                return game.プラットフォーム.includes(searchQuery);
            }
        });
        setFilteredGames(result);
    };
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/gamelist");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGames(data);
                setFilteredGames(data)
            } catch (error) {
                console.error('Fetch error:', error);
            }
        })();
    }, []);
    return (
        <>
            <div style={{ height:"100px", display:"flex", alignItems:"center" }}>
                <Select 
                    allowClear={true}
                    placeholder="検索内容を選択"
                    style={{width:"200px"}}
                    onChange={setSearchType}
                    options={[
                        {value:"name", label:"タイトルで検索"},
                        {value:"platform", label:"プラットフォームで検索"}
                    ]}>
                </Select>
                <Input 
                    allowClear={true}
                    placeholder="内容を入力してください"
                    style={{width:"200px", margin:"0 20px"}}
                    onChange={e => setSearchQuery(e.target.value)}>
                </Input>
                <Button onClick={handleSearch}>検索</Button>
            </div>
            <Card
                title="ゲームリスト"
                extra={<Link to={"/home/addgame"}>ゲームを追加</Link>}
                style={{
                    width: "100%",
                }}
                >
                <Table games={filteredGames}/>
            </Card>
        </>
    )
}