import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Space } from "antd";
import { Link } from "react-router-dom";

import { TenantFilter } from "./TenantFilter";

export const Tenant = () => {
    return (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Breadcrumb
                separator={<RightOutlined />}
                items={[
                    { title: <Link to="/">Dashboard</Link> },
                    { title: "Tenants" }
                ]}
            />
            <TenantFilter
                onFilterChange={() =>
                    (filterName: string, filterValue: string) => {
                        console.log(filterName, filterValue);
                    }}
            />
        </Space>
    );
};
