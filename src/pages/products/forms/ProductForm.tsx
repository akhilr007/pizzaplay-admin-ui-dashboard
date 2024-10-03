import { PlusOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, Row, Space, Typography, Upload } from "antd";
import { useState } from "react";

import { Filter } from "../../../components/Filter/Filter";
import { SwitchComponent } from "../../../components/Switch/Switch";
import { OPTION_PER_PAGE } from "../../../constants";
import { useGetCategories } from "../../../hooks/useGetCategories";
import { useGetTenants } from "../../../hooks/useGetTenants";
import { Tenant } from "../../Users/types";
import { Category } from "../types";
import { Attributes } from "./Attributes";
import { Pricing } from "./Pricing";

export const ProductForm = ({ isEditMode }: { isEditMode: boolean }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );

    const { data: categories } = useGetCategories();
    const { data: tenants } = useGetTenants({
        perPage: OPTION_PER_PAGE,
        currentPage: 1,
        q: ""
    });

    const categoryOption = categories?.map((category: Category) => {
        return {
            label: category?.name,
            value: category?._id
        };
    });

    const tenantOption = tenants?.data?.map((tenant: Tenant) => {
        return {
            label: tenant?.name,
            value: tenant?.id
        };
    });

    const handleCategoryChange = (categoryId: string) => {
        const selectedCategory = categories?.find(
            (category: Category) => category._id === categoryId
        );
        setSelectedCategory(selectedCategory);
    };

    return (
        <Row>
            <Col span={24}>
                <Space direction="vertical" size="large">
                    <Card title="Product Info">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="Name:"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Product Name cannot be empty"
                                        }
                                    ]}
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Filter
                                    label="Category:"
                                    name="categoryId"
                                    placeholder="Select Category"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select a category"
                                        }
                                    ]}
                                    options={categoryOption}
                                    onChange={handleCategoryChange}
                                />
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="Description:"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Description cannot be empty"
                                        }
                                    ]}
                                >
                                    <Input.TextArea
                                        allowClear
                                        rows={2}
                                        maxLength={100}
                                        style={{ resize: "none" }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card title="Product Image" bordered={false}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label=""
                                    name="image"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please upload a products image"
                                        }
                                    ]}
                                >
                                    <Upload listType="picture-card">
                                        <Space direction="vertical">
                                            <PlusOutlined />
                                            <Typography.Text>
                                                Upload
                                            </Typography.Text>
                                        </Space>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card title="Tenant Info" bordered={false}>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Filter
                                    label="Restaurant:"
                                    placeholder="Select a Restaurant"
                                    name="tenantId"
                                    options={tenantOption}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please choose a restaurant"
                                        }
                                    ]}
                                />
                            </Col>
                        </Row>
                    </Card>

                    {selectedCategory && (
                        <Pricing selectedCategory={selectedCategory} />
                    )}

                    {selectedCategory && <Attributes />}

                    <Card title="Other Properties" bordered={false}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Space>
                                    <SwitchComponent
                                        name="isPublished"
                                        isOn="Yes"
                                        isOff="No"
                                    />
                                    <Typography.Text>Published</Typography.Text>
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};
