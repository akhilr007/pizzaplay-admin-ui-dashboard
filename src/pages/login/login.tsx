import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd";
import FormItem from "antd/es/form/FormItem";

import { Logo } from "../../components/icons/Logo";

export const LoginPage = () => {
    return (
        <>
            <Layout
                style={{
                    height: "100vh",
                    display: "grid",
                    placeItems: "center"
                }}
            >
                <Space direction="vertical" align="center" size="large">
                    <Layout.Content
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Logo />
                    </Layout.Content>
                    <Card
                        bordered={false}
                        style={{ width: 300 }}
                        title={
                            <Space
                                style={{
                                    width: "100%",
                                    fontSize: 16,
                                    justifyContent: "center"
                                }}
                            >
                                <LockFilled /> Sign in
                            </Space>
                        }
                    >
                        <Form initialValues={{ remember: true }}>
                            <FormItem
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your username"
                                    },
                                    {
                                        type: "email",
                                        message: "Please enter a valid email"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Username"
                                />
                            </FormItem>
                            <FormItem
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your password"
                                    }
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Password"
                                />
                            </FormItem>
                            <Flex justify="space-between" align="center">
                                <FormItem
                                    name="remember"
                                    valuePropName="checked"
                                >
                                    <Checkbox>Remember Me</Checkbox>
                                </FormItem>
                                <FormItem>
                                    <a
                                        href="#"
                                        style={{ display: "inline-block" }}
                                    >
                                        Forgot Password
                                    </a>
                                </FormItem>
                            </Flex>

                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: "100%" }}
                                >
                                    Sign in
                                </Button>
                            </FormItem>
                        </Form>
                    </Card>
                </Space>
            </Layout>
        </>
    );
};
