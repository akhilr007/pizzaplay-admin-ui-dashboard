import { Layout, Space } from "antd";

import { Logo } from "../../components/icons/Logo";
import { LoginCard } from "../../components/Login/LoginCard";
import { contentStyle, layoutStyle } from "./styles/Login";

export const LoginPage = () => {
    return (
        <>
            <Layout style={layoutStyle}>
                <Space direction="vertical" align="center" size="large">
                    <Layout.Content style={contentStyle}>
                        <Logo />
                    </Layout.Content>
                    <LoginCard />
                </Space>
            </Layout>
        </>
    );
};
