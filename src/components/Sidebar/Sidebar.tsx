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

const items = [
    {
        key: "/",
        icon: <Icon component={Home} />,
        label: <NavLink to="/">Home</NavLink>
    },
    {
        key: "/users",
        icon: <Icon component={UserIcon} />,
        label: <NavLink to="/users">Users</NavLink>
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

export const Sidebar = () => {
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
