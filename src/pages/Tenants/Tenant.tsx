import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

import { tenants } from "../../http/api";
import { TenantFilter } from "./TenantFilter";

const getTenants = async () => {
    const { data } = await tenants();
    const { data: tenantsData } = data;
    return tenantsData;
};

export const Tenant = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const {
        data: tenants,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["users"],
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
