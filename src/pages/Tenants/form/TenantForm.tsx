import { Card, Col, Form, Input, Row } from "antd";

export const TenantForm = () => {
    return (
        <Row>
            <Col span={24}>
                <Card title="Basic Info">
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item
                                label="Name:"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Restaurant Name cannot be empty"
                                    }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Address:"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Address cannot be empty"
                                    }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};
