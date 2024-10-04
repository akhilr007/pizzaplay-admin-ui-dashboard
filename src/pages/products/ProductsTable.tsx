import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table, Tag, Typography } from "antd";
import { format } from "date-fns";
import { useState } from "react";

import { DeleteModal } from "../../components/DeleteModal/DeleteModal";
import { Product } from "./types";

type Props = {
    products: Product[];
    isLoading: boolean;
    currentPage: number;
    perPage: number;
    total: number | undefined;
    onPageChange: (page: number) => void;
    onEditProduct: (product: Product) => void;
    onDeleteProduct: (id: string) => void;
};

export const ProductsTable: React.FC<Props> = ({
    products,
    isLoading,
    currentPage,
    perPage,
    total,
    onPageChange,
    onEditProduct,
    onDeleteProduct
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(
        null
    );

    const showDeleteConfirm = (id: string) => {
        setSelectedProductId(id);
        setIsModalVisible(true);
    };

    const handleDelete = () => {
        if (selectedProductId) {
            onDeleteProduct(selectedProductId);
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setSelectedProductId(null);
        setIsModalVisible(false);
    };

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
            render: (_text: string, record: Product) => {
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
                            onClick={() => onEditProduct(record)}
                        ></Button>
                        <Button
                            type="link"
                            icon={
                                <DeleteOutlined
                                    style={{ fontSize: "24px" }}
                                    onClick={() =>
                                        showDeleteConfirm(record._id)
                                    }
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
            <DeleteModal
                name="product"
                handleCancel={handleCancel}
                handleDelete={handleDelete}
                isModalVisible={isModalVisible}
            />
        </>
    );
};
