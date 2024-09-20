import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";

import { tenants } from "../../../http/api";
import { Tenant } from "../types";

const getTenants = async () => {
    const { data } = await tenants();
    const { data: tenantsData } = data;
    return tenantsData;
};

export const UserForm = () => {
    const roleOptions = [
        { value: "admin", label: "Admin" },
        { value: "manager", label: "Manager" },
        { value: "customer", label: "Customer" }
    ];

    const { data: tenants } = useQuery({
        queryKey: ["users"],
        queryFn: getTenants
    });

    return (
        <Row>
            <Col span={24}>
                <Space direction="vertical" size="large">
                    <Card title="Basic Info">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="First Name: *"
                                    name="firstName"
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Last Name: *" name="lastName">
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email: *" name="email">
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="Security Info">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Password: *" name="password">
                                    <Input type="password" allowClear />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="Roles">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Role: *" name="role">
                                    <Select style={{ width: "100%" }}>
                                        {roleOptions.map((option) => (
                                            <Select.Option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Restaurant: *"
                                    name="tenantId"
                                >
                                    <Select style={{ width: "100%" }}>
                                        {tenants?.map((tenant: Tenant) => (
                                            <Select.Option
                                                key={tenant.id}
                                                value={tenant.name}
                                            >
                                                {tenant.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};
