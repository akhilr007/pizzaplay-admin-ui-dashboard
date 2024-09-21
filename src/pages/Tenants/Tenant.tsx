import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Space, Table, theme } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useCreateTenant } from "../../hooks/useCreateTenant";
import { tenants } from "../../http/api";
import { TenantsDrawerForm } from "./form/TenantsDrawerForm";
import { TenantFilter } from "./TenantFilter";
import { CreateTenant } from "./types";

const getTenants = async () => {
    const { data } = await tenants();
    const { data: tenantsData } = data;
    return tenantsData;
};

export const Tenant = () => {
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

    const onFormSubmit = (values: CreateTenant) => {
        createTenantMutate(values);
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

            <TenantsDrawerForm
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                onFormSubmit={onFormSubmit}
                colorBgLayout={colorBgLayout}
            />
        </Space>
    );
};
