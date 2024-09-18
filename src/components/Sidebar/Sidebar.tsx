import "./styles.css";

import Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { HeaderComponent } from "../Header/Header";
import { BasketIcon } from "../icons/BasketIcon";
import { FoodIcon } from "../icons/FoodIcon";
import { GiftIcon } from "../icons/GiftIcon";
import { Home } from "../icons/Home";
import { Logo } from "../icons/Logo";
import { UserIcon } from "../icons/UserIcon";

const { Content, Footer, Sider } = Layout;

interface SidebarProps {
    role: string;
}

const getMenuItems = (role: string) => {
    const baseItems = [
        {
            key: "/",
            icon: <Icon component={Home} />,
            label: <NavLink to="/">Home</NavLink>
        },
        {
            key: "/restaurants",
            icon: <Icon component={FoodIcon} />,
            label: <NavLink to="/restaurants">Restaurants</NavLink>
        },
        {
            key: "/products",
            icon: <Icon component={BasketIcon} />,
            label: <NavLink to="/products">Products</NavLink>
        },
        {
            key: "/promos",
            icon: <Icon component={GiftIcon} />,
            label: <NavLink to="/promos">Promos</NavLink>
        }
    ];

    if (role === "admin") {
        const menuItems = [...baseItems];

        menuItems.splice(1, 0, {
            key: "/users",
            icon: <Icon component={UserIcon} />,
            label: <NavLink to="/users">Users</NavLink>
        });

        return menuItems;
    }

    return baseItems;
};

export const Sidebar = (userRole: SidebarProps) => {
    const items = getMenuItems(userRole.role);
    const [collapsed, setCollapsed] = useState(false);
    const [text] = useState("484848");

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                theme="light"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="logo">
                    {collapsed ? <Logo /> : <Logo text={text} />}
                </div>
                <Menu
                    theme="light"
                    defaultSelectedKeys={[items[0].key]}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout>
                <HeaderComponent />
                <Content style={{ margin: "24px" }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    PizzaPlay ©{new Date().getFullYear()} Made with ❤️
                </Footer>
            </Layout>
        </Layout>
    );
};
