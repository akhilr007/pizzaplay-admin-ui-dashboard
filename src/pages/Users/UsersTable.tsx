import { Table } from "antd";

import { User } from "./types";

type Props = {
    users: User[] | undefined;
    isLoading: boolean;
    currentPage: number;
    perPage: number;
    totalUsers: number | undefined;
    onPageChange: (page: number) => void;
};

export const UsersTable: React.FC<Props> = ({
    users,
    isLoading,
    currentPage,
    perPage,
    totalUsers,
    onPageChange
}) => {
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
        <Table
            columns={columns}
            dataSource={users}
            rowKey={"id"}
            loading={isLoading}
            pagination={{
                total: totalUsers,
                pageSize: perPage,
                current: currentPage,
                onChange: onPageChange
            }}
        />
    );
};
