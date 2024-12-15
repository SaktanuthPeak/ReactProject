import React, { useState, useEffect } from 'react';
import { Spin, Typography, Divider, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import App from '../components/nav';
import Home from '../components/Home';
const URL_TXACTIONS = '/api/txactions';

function HomeScreen() {
    const [summaryAmount, setSummaryAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const navigate = useNavigate();


    const handleEditClick = () => {
        navigate("/Home/Finance");
    };


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
                <App />
            </header>
            <body className='App-finance-body'>
                <Spin spinning={isLoading}>
                    <Typography.Title>จำนวนเงินปัจจุบัน {summaryAmount} บาท</Typography.Title>
                    <Divider>บันทึก รายรับ - รายจ่าย</Divider>
                    {/* Add your components that handle editing */}
                    <Home
                        data={transactionData} />
                    <Button onClick={handleEditClick}>Go to Edit</Button>
                </Spin>
            </body>
        </div>
    );
}

export default HomeScreen;