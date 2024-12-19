import React, { useState, useEffect } from 'react';
import { Spin, Typography, Divider, Button } from 'antd';
import AddItem from '../components/Additem';
import TransactionList from '../table/EditOrDeleteTable';
import Modal from '../components/Edit';
import axios from 'axios';
import dayjs from 'dayjs';
import Nav from '../components/nav'
import { useNavigate } from 'react-router-dom';

const URL_TXACTIONS = '/api/txactions';

function EditOrDeletePage() {
    const [summaryAmount, setSummaryAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const navigate = useNavigate();

    const openModal = (record) => {
        setEditingRecord(record);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingRecord(null);
    };

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

    const handleRowEdited = async (item) => {
        try {
            setIsLoading(true);
            // const params = { ...item, action_datetime: dayjs() };
            const response = await axios.put(`${URL_TXACTIONS}/${item.id}`, { data: item });
            fetchItems();
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

    const handleRowDeleted = async (itemId) => {
        try {
            setIsLoading(true);
            await axios.delete(`${URL_TXACTIONS}/${itemId}`);
            fetchItems();
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
    const handleEditClick = () => {
        navigate("/Home");
    }


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
            <body >


                <Spin spinning={isLoading}>
                    <Typography.Title>จำนวนเงินปัจจุบัน {summaryAmount} บาท</Typography.Title>

                    <Divider>บันทึก รายรับ - รายจ่าย</Divider>
                    <div className="table-container">
                        <TransactionList
                            data={transactionData}
                            onRowEdited={openModal}
                            onNoteChanged={handleNoteChanged}
                            onRowDeleted={handleRowDeleted}
                        />
                        {isModalVisible && (
                            <Modal
                                defaultValue={editingRecord}
                                closeModal={closeModal}
                                onSubmit={handleRowEdited}
                            />
                        )}
                    </div>

                    <Button onClick={handleEditClick}>Go to Home</Button>
                </Spin>
            </body>
        </div >
    );
}

export default EditOrDeletePage;
