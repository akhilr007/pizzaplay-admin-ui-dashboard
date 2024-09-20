import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import {
    Breadcrumb,
    Button,
    Drawer,
    Flex,
    Form,
    Space,
    Spin,
    Table,
    theme,
    Typography
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

import { PER_PAGE } from "../../constants";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useGetUsers } from "../../hooks/useGetUsers";
import { useAuthStore } from "../../store";
import { UserForm } from "./Forms/UserForm";
import { User } from "./types";
import { UsersFilter } from "./UsersFilter";

export const Users = () => {
    const [form] = Form.useForm();
    const { colorBgLayout } = theme.useToken().token;
    const { user } = useAuthStore();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1
    });

    const {
        data: users,
        isFetching,
        isError,
        error
    } = useGetUsers(queryParams, user?.role === "admin");

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

    const {
        createUserMutation: { mutate: createUserMutate }
    } = useCreateUser();

    const onHandleFormSubmit = async () => {
        await form.validateFields();
        createUserMutate(form.getFieldsValue());
        form.resetFields();
        setDrawerOpen(false);
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Flex justify="space-between">
                <Breadcrumb
                    separator={<RightOutlined />}
                    items={[
                        { title: <Link to="/">Dashboard</Link> },
                        { title: "Users" }
                    ]}
                />
                {isFetching && (
                    <Spin
                        indicator={
                            <LoadingOutlined style={{ fontSize: 24 }} spin />
                        }
                    />
                )}
                {isError && (
                    <Typography.Text type="danger">
                        {error.message}
                    </Typography.Text>
                )}
            </Flex>

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

            <Table
                columns={columns}
                dataSource={users?.data}
                rowKey={"id"}
                loading={isFetching}
                pagination={{
                    total: users?.total,
                    pageSize: PER_PAGE,
                    current: users?.currentPage,
                    onChange: (page: number) => {
                        setQueryParams((prev) => {
                            return {
                                ...prev,
                                currentPage: page
                            };
                        });
                    }
                }}
            />

            <Drawer
                title="Create New User"
                destroyOnClose
                width={720}
                styles={{ body: { background: colorBgLayout } }}
                open={drawerOpen}
                onClose={() => {
                    form.resetFields();
                    setDrawerOpen(false);
                }}
                extra={
                    <Space>
                        <Button
                            onClick={() => {
                                form.resetFields();
                                setDrawerOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="primary" onClick={onHandleFormSubmit}>
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical">
                    <UserForm />
                </Form>
            </Drawer>
        </Space>
    );
};
