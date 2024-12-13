import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, Select } from 'antd';

const Edit = ({ defaultValue, closeModal, onSubmit }) => {
    const [form] = Form.useForm();


    useEffect(() => {
        if (defaultValue) {
            form.setFieldsValue({
                id: defaultValue.id,
                note: defaultValue.note,
                amount: defaultValue.amount,
                type: defaultValue.type,
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
            title="แก้ไขข้อมูล"
            visible={true}
            onCancel={closeModal}
            footer={[
                <Button key="cancel" onClick={closeModal}>
                    ยกเลิก
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    บันทึก
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="id" label="ID" hidden>
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="ชนิด"
                    rules={[{ required: true, message: 'กรุณาเลือกชนิด!' }]}
                >
                    <Select
                        style={{ width: '100%' }}
                        options={[
                            { value: 'income', label: 'รายรับ' },
                            { value: 'expense', label: 'รายจ่าย' },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name="note"
                    label="หมายเหตุ"
                    rules={[{ required: true, message: 'กรุณากรอกหมายเหตุ!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="amount"
                    label="จำนวนเงิน"
                    rules={[{ required: true, message: 'กรุณากรอกจำนวนเงิน!' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        step={1}
                        formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Edit;
