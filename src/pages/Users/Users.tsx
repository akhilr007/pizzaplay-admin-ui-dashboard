import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Space, Table } from "antd";
import { Link } from "react-router-dom";

import { users } from "../../http/api";
import { useAuthStore } from "../../store";
import { User } from "./types";

const getUsers = async () => {
    const { data } = await users();
    const { data: usersData } = data;
    return usersData;
};

export const Users = () => {
    const { user } = useAuthStore();

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
            <Table columns={columns} dataSource={users} />
        </Space>
    );
};
