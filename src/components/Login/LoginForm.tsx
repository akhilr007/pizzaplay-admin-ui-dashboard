import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

import { loginFormButton } from "./styles";

export const LoginForm = () => {
    return (
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
                <Input prefix={<UserOutlined />} placeholder="Username" />
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
                <FormItem name="remember" valuePropName="checked">
                    <Checkbox>Remember Me</Checkbox>
                </FormItem>
                <FormItem>
                    <a href="#" style={{ display: "inline-block" }}>
                        Forgot Password
                    </a>
                </FormItem>
            </Flex>

            <FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={loginFormButton}
                >
                    Sign in
                </Button>
            </FormItem>
        </Form>
    );
};
