import { LockFilled } from "@ant-design/icons";
import { Card, Space } from "antd";

import { LoginForm } from "./LoginForm";
import { loginCardTitle } from "./styles/LoginCard";

export const LoginCard = () => {
    return (
        <Card
            bordered={false}
            style={{ width: 300 }}
            title={
                <Space style={loginCardTitle}>
                    <LockFilled /> Sign in
                </Space>
            }
        >
            <LoginForm />
        </Card>
    );
};
