import { Table } from "antd";

import { Tenant } from "../Users/types";

type Props = {
    users: Tenant[] | undefined;
    isLoading: boolean;
    currentPage: number;
    perPage: number;
    totalUsers: number | undefined;
    onPageChange: (page: number) => void;
};

export const TenantsTable: React.FC<Props> = ({
    users,
    isLoading,
    currentPage,
    perPage,
    totalUsers,
    onPageChange
}) => {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address"
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
                onChange: onPageChange,
                showTotal: (total: number, range: number[]) => {
                    return `Showing ${range[0]}-${range[1]} of ${total} items`;
                }
            }}
        />
    );
};
