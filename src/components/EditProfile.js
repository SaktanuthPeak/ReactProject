import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

const EditProfile = ({ defaultValue, closeModal, onSubmit }) => {
    const [form] = Form.useForm();


    useEffect(() => {
        if (defaultValue) {
            form.setFieldsValue({
                email: defaultValue.email,
                username: defaultValue.username,
                firstname: defaultValue.firstname,
                lastname: defaultValue.lastname


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
            title="Edit Profile"
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
                    name="email"
                    label="email"
                    rules={[{ required: true, message: 'โปรดใส่อีเมล!' }]}
                >
                    <Input.TextArea rows={1} />
                </Form.Item>


                <Form.Item
                    name="username"
                    label="username"
                    rules={[{ required: true, message: 'ใส่ Username!' }]}
                >
                    <Input.TextArea rows={1} />
                </Form.Item>

                <Form.Item
                    name="firstname"
                    label="firstname"
                    rules={[{ required: true, message: 'โปรดใส่ชื่อจริง!' }]}
                >
                    <Input.TextArea rows={1} />
                </Form.Item>

                <Form.Item
                    name="lastname"
                    label="lastname"
                    rules={[{ required: true, message: 'โปรดใส่นามสกุล' }]}
                >
                    <Input.TextArea rows={1} />
                </Form.Item>


            </Form>
        </Modal >
    );
};

export default EditProfile;
