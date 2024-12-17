import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, Select } from 'antd';

const Edit = ({ defaultValue, closeModal, onSubmit }) => {
    const [form] = Form.useForm();


    useEffect(() => {
        if (defaultValue) {
            form.setFieldsValue({
                id: defaultValue.id,
                note: defaultValue.note,
                amount: defaultValue.amount

            });
        }
    }, [defaultValue, form]);

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const updatedRecord = {
                ...defaultValue,
                ...values,
            };
            console.log("Updated Record:", updatedRecord);
            onSubmit(updatedRecord);
            closeModal();
        });
    };

    return (
        <Modal
            title="Edit transaction"
            open={true}
            onCancel={closeModal}
            footer={[
                <Button key="cancel" onClick={closeModal}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Edit
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="id" label="ID" hidden >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="ชนิด"
                    rules={[{ required: true, message: 'กรุณาเลือกชนิด!' }]}
                    layout="horizontal"
                >
                    <Select
                        allowClear
                        style={{ width: '100px' }}
                        options={[
                            { value: 'income', label: 'รายรับ' },
                            { value: 'expense', label: 'รายจ่าย' },
                        ]}
                    />
                </Form.Item>


                <Form.Item
                    name="amount"
                    label="จำนวนเงิน"
                    rules={[{ required: true, message: 'กรุณากรอกจำนวนเงิน!' }]}>
                    <InputNumber placeholder="จํานวนเงิน" />
                </Form.Item>


                <Form.Item
                    name="note"
                    label="หมายเหตุ"
                    rules={[{ required: true, message: 'กรุณากรอกหมายเหตุ!' }]}
                >
                    <Input.TextArea rows={1} />
                </Form.Item>
            </Form>
        </Modal >
    );
};

export default Edit;
