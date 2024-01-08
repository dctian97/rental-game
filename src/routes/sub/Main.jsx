import { Column } from '@ant-design/charts';
import React, { useState, useEffect } from 'react';
export default function Main() {
    const [data, setData] = useState([])
    useEffect(() => {
    (async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/chart");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
        })();
    }, []);
    const config = {
        data,
        xField: 'タイトル',
        yField: '貸出回数',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
            },
            xAxis: {
            label: {
                autoHide: true, 
                autoRotate: false, 
                rotate: -45, 
                style: {
                    fontSize: 12, 
                }
            },
            },
            meta: {
            type: {
                alias: 'タイトル',
            },
            sales: {
                alias: '貸出回数',
            },
            },
        };
    return (
        <>
            <h1>売上</h1>
            <Column {...config} />
        </>
    )
}