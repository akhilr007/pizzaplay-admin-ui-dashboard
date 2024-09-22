import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";

import { tenants } from "../../../http/api";
import { Tenant } from "../types";

const getTenants = async () => {
    const { data } = await tenants();
    const { data: tenantsData } = data;
    return tenantsData;
};

export const UserForm = ({ isEditMode }: { isEditMode: boolean }) => {
    const roleOptions = [
        { value: "admin", label: "Admin" },
        { value: "manager", label: "Manager" }
    ];

    const { data: tenants } = useQuery({
        queryKey: ["tenants"],
        queryFn: getTenants
    });

    const selectedRole = Form.useWatch("role");

    return (
        <Row>
            <Col span={24}>
                <Space direction="vertical" size="large">
                    <Card title="Basic Info">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="First Name:"
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "First Name cannot be empty"
                                        }
                                    ]}
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Last Name:"
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Last Name cannot be empty"
                                        }
                                    ]}
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Email:"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Email cannot be empty"
                                        },
                                        {
                                            type: "email",
                                            message: "Email is not valid"
                                        }
                                    ]}
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    {!isEditMode && (
                        <Card title="Security Info">
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Password:"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Password cannot be empty"
                                            }
                                        ]}
                                    >
                                        <Input type="password" allowClear />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    )}

                    <Card title="Roles">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="Role:"
                                    name="role"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Role cannot be empty"
                                        }
                                    ]}
                                >
                                    <Select
                                        style={{ width: "100%" }}
                                        id="userFormRole"
                                    >
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
                            {selectedRole === "manager" && (
                                <Col span={12}>
                                    <Form.Item
                                        label="Restaurant:"
                                        name="tenantId"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Restaurant cannot be empty"
                                            }
                                        ]}
                                    >
                                        <Select style={{ width: "100%" }}>
                                            {tenants?.map((tenant: Tenant) => (
                                                <Select.Option
                                                    key={tenant.id}
                                                    value={tenant.id}
                                                >
                                                    {tenant.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            )}
                        </Row>
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};
