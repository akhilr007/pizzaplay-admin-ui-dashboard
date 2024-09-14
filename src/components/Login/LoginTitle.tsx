import { LockFilled } from "@ant-design/icons";
import { Space } from "antd";

import { loginCardTitle } from "./styles";

export const LoginTitle = () => {
    return (
        <Space style={loginCardTitle}>
            <LockFilled /> Sign in
        </Space>
    );
};
