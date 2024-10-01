import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Space, Table, Tag, Typography } from "antd";
import { format } from "date-fns";

import { Product } from "./types";

type Props = {
    products: Product[];
    isLoading: boolean;
    currentPage: number;
    perPage: number;
    total: number | undefined;
    onPageChange: (page: number) => void;
};

export const ProductsTable: React.FC<Props> = ({
    products,
    isLoading,
    currentPage,
    perPage,
    total,
    onPageChange
}) => {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_text: string, record: Product) => {
                return (
                    <Space>
                        <Image width={60} src={record.image} preview={false} />
                        <Typography.Text>{record.name}</Typography.Text>
                    </Space>
                );
            }
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Status",
            dataIndex: "isPublished",
            key: "isPublished",
            render: (_text: string, record: Product) => {
                return (
                    <>
                        {record.isPublished ? (
                            <Tag color="green">Published</Tag>
                        ) : (
                            <Tag color="red">Draft</Tag>
                        )}
                    </>
                );
            }
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string, record: Product) => {
                return (
                    <Typography.Text>
                        {format(new Date(record.createdAt), "dd/MM/yyyy HH:mm")}
                    </Typography.Text>
                );
            }
        },
        {
            title: "",
            align: "right" as const,
            render: (_: string, record: Product) => {
                return (
                    <Space size="large">
                        <Button
                            type="link"
                            icon={<EditOutlined style={{ fontSize: "24px" }} />}
                            onClick={() => {}}
                        ></Button>
                        <Button
                            type="link"
                            icon={
                                <DeleteOutlined
                                    style={{ fontSize: "24px" }}
                                    onClick={() => {}}
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
                dataSource={products}
                rowKey={"_id"}
                loading={isLoading}
                pagination={{
                    pageSize: perPage,
                    current: currentPage,
                    total: total,
                    onChange: onPageChange,
                    showTotal: (total: number, range: number[]) => {
                        return `Showing ${range[0]}-${range[1]} of ${total} items`;
                    }
                }}
            />
            <Modal
            // title="Confirm Deletion"
            // open={isModalVisible}
            // onOk={handleDelete}
            // onCancel={handleCancel}
            // okText="Yes, Delete"
            // cancelText="Cancel"
            // width={500}
            >
                <p>Are you sure you want to delete this user?</p>
            </Modal>
        </>
    );
};
