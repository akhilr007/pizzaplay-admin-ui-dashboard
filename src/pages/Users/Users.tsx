import { RightOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

import { users } from "../../http/api";
import { useAuthStore } from "../../store";
import { User } from "./types";
import { UsersFilter } from "./UsersFilter";

const getUsers = async () => {
    const { data } = await users();
    const { data: usersData } = data;
    return usersData;
};

export const Users = () => {
    const { user } = useAuthStore();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {
        data: users,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        enabled: user?.role === "admin"
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Name",
            dataIndex: "firstName",
            key: "firstName",
            render: (_text: string, record: User) => {
                return (
                    <div>
                        {record.firstName} {record.lastName}
                    </div>
                );
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role"
        },
        {
            title: "Tenant",
            dataIndex: "name",
            key: "tenant",
            render: (_text: string, record: User) => {
                return record.tenant ? (
                    <div>{record.tenant.name}</div>
                ) : (
                    <div>Not Applicable</div>
                );
            }
        }
    ];

    return (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Breadcrumb
                separator={<RightOutlined />}
                items={[
                    { title: <Link to="/">Dashboard</Link> },
                    { title: "Users" }
                ]}
            />
            {isLoading && <div>Loading...</div>}
            {isError && <div>{error.message}</div>}

            <UsersFilter
                onFilterChange={(filterName: string, filterValue: string) => {
                    console.log(filterName, filterValue);
                }}
            >
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setDrawerOpen(true)}
                >
                    Add User
                </Button>
            </UsersFilter>

            <Table columns={columns} dataSource={users} rowKey={"id"} />

            <Drawer
                title="Create New User"
                destroyOnClose
                width={720}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                extra={
                    <Space>
                        <Button>Cancel</Button>
                        <Button type="primary">Submit</Button>
                    </Space>
                }
            >
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Cumque aperiam id tempora a sit aliquid repudiandae
                    voluptatibus provident earum accusamus?
                </p>
            </Drawer>
        </Space>
    );
};
