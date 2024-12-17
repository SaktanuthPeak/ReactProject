import React from 'react';
import { Table, Button, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

export default function Home(props) {
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
                    {type ? type.toUpperCase() : "null"}
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
        }




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