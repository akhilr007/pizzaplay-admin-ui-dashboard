import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import { useState } from "react";

import { User } from "./types";

type Props = {
    users: User[] | undefined;
    isLoading: boolean;
    currentPage: number;
    perPage: number;
    totalUsers: number | undefined;
    onPageChange: (page: number) => void;
    onEditUser: (user: User) => void;
    onDeleteUser: (id: number) => void;
};

export const UsersTable: React.FC<Props> = ({
    users,
    isLoading,
    currentPage,
    perPage,
    totalUsers,
    onPageChange,
    onEditUser,
    onDeleteUser
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const showDeleteConfirm = (userId: number) => {
        setSelectedUserId(userId);
        setIsModalVisible(true);
    };

    const handleDelete = () => {
        if (selectedUserId !== null) {
            onDeleteUser(selectedUserId);
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
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
            title: "Restaurant",
            dataIndex: "name",
            key: "tenant",
            render: (_text: string, record: User) => {
                return record.tenant ? (
                    <div>{record.tenant.name}</div>
                ) : (
                    <div>Not Applicable</div>
                );
            }
        },
        {
            title: "",
            render: (_: string, record: User) => {
                return (
                    <Space size="large">
                        <Button
                            type="link"
                            icon={<EditOutlined style={{ fontSize: "24px" }} />}
                            onClick={() => onEditUser(record)}
                        ></Button>
                        <Button
                            type="link"
                            icon={
                                <DeleteOutlined
                                    style={{ fontSize: "24px" }}
                                    onClick={() => showDeleteConfirm(record.id)}
                                />
                            }
                        ></Button>
                    </Space>
                );
            }
        }
    ];

    return (
        <>
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
            <Modal
                title="Confirm Deletion"
                open={isModalVisible}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Yes, Delete"
                cancelText="Cancel"
                width={500}
            >
                <p>Are you sure you want to delete this user?</p>
            </Modal>
        </>
    );
};
