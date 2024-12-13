import React from 'react';
import { Table, Button, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

export default function TransactionList(props) {
    const columns = [
        {
            title: 'Date-Time',
            dataIndex: 'action_datetime',
            key: 'action_datetime',
            render: (_, record) => dayjs(record.action_datetime).format("DD/MM/YYYY - HH:mm")

        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={type === "income" ? "green" : "red"}>
                    {type.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Action',
            key: 'amount',
            render: (transaction) => (
                <>

                    <Button color="default" variant="outlined"
                        onClick={() => props.onRowEdited(transaction)}
                        style={{ marginRight: 8 }}>
                        Edit
                    </Button>

                    <Button
                        type="primary"
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => props.onRowDeleted(transaction.id)}
                    >
                        Delete
                    </Button>

                </>
            )
        },
    ];
    return (
        <Table
            dataSource={props.data}
            columns={columns}
            rowKey="id"
            bordered
        />
    );

}