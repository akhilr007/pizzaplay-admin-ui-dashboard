import { Card, Col, Row } from "antd";
import React from "react";

import { Filter } from "../../components/Filter/Filter";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { SwitchComponent } from "../../components/Switch/Switch";

interface ProductFilterProps {
    children: React.ReactNode;
}

export const ProductsFilter = ({ children }: ProductFilterProps) => {
    return (
        <Card>
            <Row
                justify="space-between"
                align="middle"
                style={{ width: "100%" }}
            >
                <Col span={20}>
                    <Row gutter={24} align="middle">
                        <Col span={8}>
                            <SearchInput name="q" />
                        </Col>
                        <Col span={5}>
                            <Filter
                                name="category"
                                placeholder="Category"
                                options={[]}
                            />
                        </Col>
                        <Col span={5}>
                            <Filter
                                name="tenant"
                                placeholder="Restaurants"
                                options={[]}
                            />
                        </Col>

                        <Col span={6}>
                            <SwitchComponent />
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={4}
                    style={{
                        display: "flex",
                        justifyContent: "end"
                    }}
                >
                    {children}
                </Col>
            </Row>
        </Card>
    );
};
