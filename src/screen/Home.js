import React, { useState, useEffect } from 'react';
import { Spin, Typography, Divider, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/nav';
import Home from '../table/HomeTable';
const URL_TXACTIONS = '/api/txactions';


function HomeScreen() {
    const [summaryAmount, setSummaryAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const handleLogout = () => {
        setIsAuthenticated(false)
    }




    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(URL_TXACTIONS);
                const data = response.data.data.map((row) => ({
                    id: row.id,
                    key: row.id,
                    ...row.attributes,
                }));
                setTransactionData(data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, []);


    useEffect(() => {
        setSummaryAmount(
            transactionData.reduce(
                (sum, transaction) =>
                    transaction.type === 'income' ? sum + transaction.amount : sum - transaction.amount,
                0
            )
        );
    }, [transactionData]);

    return (
        <div className="App">
            <header>
                <Nav />
            </header>
            <body className>
                <Spin spinning={isLoading}>
                    <Typography.Title>จำนวนเงินปัจจุบัน {summaryAmount} บาท</Typography.Title>
                    <Divider>บันทึก รายรับ - รายจ่าย</Divider>
                    <div className="table-container">
                        <Home data={transactionData} />
                    </div>
                </Spin>
            </body>
        </div>
    );
}

export default HomeScreen;
