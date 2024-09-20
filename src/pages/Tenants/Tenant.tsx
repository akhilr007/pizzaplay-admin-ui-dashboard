import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useCreateTenant } from "../../hooks/useCreateTenant";
import { tenants } from "../../http/api";
import { TenantForm } from "./form/TenantForm";
import { TenantFilter } from "./TenantFilter";

const getTenants = async () => {
    const { data } = await tenants();
    const { data: tenantsData } = data;
    return tenantsData;
};

export const Tenant = () => {
    const [form] = Form.useForm();
    const { colorBgLayout } = theme.useToken().token;
    const [drawerOpen, setDrawerOpen] = useState(false);

    const {
        data: tenants,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["tenants"],
        queryFn: getTenants
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
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

    const {
        createTenantMutation: { mutate: createTenantMutate }
    } = useCreateTenant();

    const handleFormSubmit = async () => {
        await form.validateFields();
        createTenantMutate(form.getFieldsValue());
        form.resetFields();
        setDrawerOpen(false);
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Breadcrumb
                separator={<RightOutlined />}
                items={[
                    { title: <Link to="/">Dashboard</Link> },
                    { title: "Tenants" }
                ]}
            />

            {isLoading && <div>Loading...</div>}
            {isError && <div>{error.message}</div>}

            <TenantFilter
                onFilterChange={() =>
                    (filterName: string, filterValue: string) => {
                        console.log(filterName, filterValue);
                    }}
            >
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setDrawerOpen(true)}
                >
                    Add Tenant
                </Button>
            </TenantFilter>

            <Table columns={columns} dataSource={tenants} rowKey={"id"} />

            <Drawer
                title="Create New Tenant"
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
                        <Button type="primary" onClick={handleFormSubmit}>
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical">
                    <TenantForm />
                </Form>
            </Drawer>
        </Space>
    );
};
