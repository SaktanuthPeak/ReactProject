import { Button, Form, Select, Input, InputNumber } from "antd";
export default function AddItem(props) {
    return (
        <Form layout="inline" onFinish={props.onItemAdded} style={{ 'justify-content': 'center', 'padding': '1rem' }}>
            <Form.Item name="type" label="ชนิด" rules={[{ required: true }]}>
                <Select
                    allowClear
                    style={{ width: "100px" }}
                    options={[
                        {
                            value: "income",
                            label: "รายรับ",
                        },
                        {
                            value: "expense",
                            label: "รายจ่าย",
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item name="amount" label="จํานวนเงิน" rules={[{ required: true, message: 'กรุณากรอกจำนวนเงิน!' }]}>
                <InputNumber placeholder="จํานวนเงิน" />
            </Form.Item>
            <Form.Item name="note" label="หมายเหตุ" rules={[{ required: true, message: 'กรุณากรอกหมายเหตุ!' }]}>
                <Input placeholder="Note" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
}