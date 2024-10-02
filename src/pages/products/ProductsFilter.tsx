import { Card, Col, Row } from "antd";
import { useState } from "react";

import { Filter } from "../../components/Filter/Filter";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { SwitchComponent } from "../../components/Switch/Switch";
import { OPTION_PER_PAGE } from "../../constants";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useGetTenants } from "../../hooks/useGetTenants";
import { Tenant } from "../Users/types";
import { Category } from "./types";

interface ProductFilterProps {
    children: React.ReactNode;
}

export const ProductsFilter = ({ children }: ProductFilterProps) => {
    const [queryParams] = useState({
        perPage: OPTION_PER_PAGE,
        currentPage: 1,
        q: "",
        role: ""
    });

    const { data: restaurants } = useGetTenants(queryParams);

    const { data: categories } = useGetCategories();

    const restaurantOption = restaurants?.data?.map((restaurant: Tenant) => {
        return {
            label: restaurant?.name,
            value: restaurant?.id
        };
    });

    const categoryOption = categories?.map((category: Category) => {
        return {
            label: category?.name,
            value: category?._id
        };
    });

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
                                name="categoryId"
                                placeholder="Category"
                                options={categoryOption}
                            />
                        </Col>
                        <Col span={5}>
                            <Filter
                                name="tenantId"
                                placeholder="Restaurants"
                                options={restaurantOption}
                            />
                        </Col>

                        <Col span={6}>
                            <SwitchComponent
                                name="isPublished"
                                isOn="Show Published"
                                isOff="Show All"
                            />
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
