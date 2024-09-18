import { BellFilled } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Flex, Space, Tag, theme } from "antd";
import { Header } from "antd/es/layout/layout";

import { useLogout } from "../../hooks/useLogout";
import { useAuthStore } from "../../store";
import { avatarStyle, headerStyle, tagStyle } from "./styles";

export const HeaderComponent = () => {
    const { user } = useAuthStore();
    const { token } = theme.useToken();
    const {
        logoutMutation: { mutate }
    } = useLogout();

    return (
        <Header style={{ ...headerStyle, background: token.colorBgContainer }}>
            <Flex align="center" justify="space-between">
                <Tag color="orange" style={tagStyle}>
                    {user?.role === "admin"
                        ? "You are an admin"
                        : user?.tenant?.name}
                </Tag>
                <Space size={16}>
                    <Badge dot={true}>
                        <BellFilled />
                    </Badge>
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: "logout",
                                    label: "Logout",
                                    onClick: () => mutate()
                                }
                            ]
                        }}
                    >
                        <Avatar style={avatarStyle}>U</Avatar>
                    </Dropdown>
                </Space>
            </Flex>
        </Header>
    );
};
