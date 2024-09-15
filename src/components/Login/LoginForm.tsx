import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Checkbox, Flex, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

import { login } from "../../http/api";
import { loginFormButton } from "./styles";
import { errorStyle } from "./styles";
import { Credentials } from "./types";

const loginUser = async (credentials: Credentials) => {
    const { data } = await login(credentials);
    return data;
};

export const LoginForm = () => {
    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ["login"],
        mutationFn: loginUser,
        onSuccess: async () => {
            console.log("login successful");
        }
    });

    return (
        <Form
            initialValues={{ remember: true }}
            onFinish={(values) => {
                mutate({ email: values.username, password: values.password });
            }}
        >
            {isError && (
                <Alert
                    style={errorStyle}
                    type="error"
                    message={error?.message}
                />
            )}
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
                    loading={isPending}
                >
                    Sign in
                </Button>
            </FormItem>
        </Form>
    );
};
