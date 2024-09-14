import { Card } from "antd";

import { LoginForm } from "./LoginForm";
import { LoginTitle } from "./LoginTitle";

export const LoginCard = () => {
    return (
        <Card bordered={false} style={{ width: 300 }} title={<LoginTitle />}>
            <LoginForm />
        </Card>
    );
};
