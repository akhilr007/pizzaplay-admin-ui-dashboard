import { Card, Col, Row } from "antd";
import React from "react";

import { Filter } from "../../components/Filter/Filter";
import { SearchInput } from "../../components/SearchInput/SearchInput";

interface UserFilterProps {
    children: React.ReactNode;
}

const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "customer", label: "Customer" }
];

export const UsersFilter = ({ children }: UserFilterProps) => {
    return (
        <Card>
            <Row justify="space-between">
                <Col span={20}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <SearchInput name="q" />
                        </Col>
                        <Col span={4}>
                            <Filter
                                name="role"
                                placeholder="Role"
                                options={roleOptions}
                            />
                        </Col>
                        {/* <Col span={4}>
                            <StatusFilter onFilterChange={onFilterChange} />
                        </Col> */}
                    </Row>
                </Col>
                <Col
                    span={4}
                    style={{ display: "flex", justifyContent: "end" }}
                >
                    {children}
                </Col>
            </Row>
        </Card>
    );
};
