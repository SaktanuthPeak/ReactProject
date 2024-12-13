import React, { useState, useEffect } from 'react';
import { Spin, Typography, Divider } from 'antd';
import AddItem from './components/Additem';
import TransactionList from './components/TransactionList';
import Modal from './components/Edit';
import axios from 'axios';
import dayjs from 'dayjs';

const URL_TXACTIONS = '/api/txactions';

function FinanceScreen() {
    const [summaryAmount, setSummaryAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

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

    const handleRowEdited = async (record) => {
        try {
            setIsLoading(true);
            const response = await axios.put(`${URL_TXACTIONS}/${record.id}`, {
                data: record,
            });
            const updatedData = transactionData.map((transaction) =>
                transaction.id === record.id
                    ? { id: record.id, key: record.id, ...record }
                    : transaction
            );
            setTransactionData(updatedData);
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
            <header className="App-header">
                <Spin spinning={isLoading}>
                    <Typography.Title>จำนวนเงินปัจจุบัน {summaryAmount} บาท</Typography.Title>

                    <AddItem onItemAdded={handleAddItem} />
                    <Divider>บันทึก รายรับ - รายจ่าย</Divider>
                    <TransactionList
                        data={transactionData}
                        onRowEdited={openModal}
                    />
                    {isModalVisible && (
                        <Modal
                            defaultValue={editingRecord}
                            closeModal={closeModal}
                            onSubmit={handleRowEdited}
                        />
                    )}
                </Spin>
            </header>
        </div>
    );
}

export default FinanceScreen;
