import React, { useState, useEffect } from 'react';
import { Spin, Divider } from 'antd';
import AddItem from '../components/Additem';
import axios from 'axios';
import dayjs from 'dayjs';
import Nav from '../components/nav'
import { useNavigate } from 'react-router-dom';
import AddTable from '../table/AddTable';

const URL_TXACTIONS = '/api/txactions';

function AddPage() {
    const [summaryAmount, setSummaryAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const navigate = useNavigate();


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
    const handleNoteChanged = (id, note) => {
        setTransactionData(
            transactionData.map(transaction => {
                transaction.note = transaction.id === id ? note : transaction.note;
                return transaction
            })
        )
    }
    const handleAddItem = async (item) => {
        try {
            setIsLoading(true);
            const params = { ...item, action_datetime: dayjs() };
            const response = await axios.post(URL_TXACTIONS, { data: params });
            const { id, attributes } = response.data.data;
            setTransactionData([
                ...transactionData,
                { id: id, key: id, ...attributes },
            ]);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
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
            <body className='table-container'>
                <Spin spinning={isLoading}>

                    <AddItem onItemAdded={handleAddItem} />
                    <Divider>บันทึก รายรับ - รายจ่าย</Divider>
                    <AddTable
                        data={transactionData}
                        onNoteChanged={handleNoteChanged}
                    />
                </Spin>
            </body>
        </div >
    );
}

export default AddPage;
