import {
    Card,
    Col,
    Form,
    FormInstance,
    Input,
    Row,
    Space,
    Typography
} from "antd";
import { useCallback, useEffect, useState } from "react";

import { Filter } from "../../../components/Filter/Filter";
import { SwitchComponent } from "../../../components/Switch/Switch";
import { OPTION_PER_PAGE } from "../../../constants";
import { useGetCategories } from "../../../hooks/useGetCategories";
import { useGetTenants } from "../../../hooks/useGetTenants";
import { useAuthStore } from "../../../store";
import { Tenant } from "../../Users/types";
import { Category, Product } from "../types";
import { Attributes } from "./Attributes";
import { Pricing } from "./Pricing";
import { ProductImage } from "./ProductImage";

interface ProductForm {
    form: FormInstance;
    editProduct: Product | null;
}

export const ProductForm: React.FC<ProductForm> = ({ form, editProduct }) => {
    const { user } = useAuthStore();
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
            value: String(tenant?.id)
        };
    });

    const handleCategoryChange = useCallback(
        (categoryId: string) => {
            const selectedCategory = categories?.find(
                (category: Category) => category._id === categoryId
            );
            setSelectedCategory(selectedCategory);
        },
        [categories]
    );

    useEffect(() => {
        if (editProduct) {
            handleCategoryChange(editProduct.categoryId);
        }
    }, [editProduct, handleCategoryChange]);

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
                                <ProductImage
                                    initialImage={form.getFieldValue("image")}
                                />
                            </Col>
                        </Row>
                    </Card>

                    {user?.role !== "manager" && (
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
                    )}

                    {selectedCategory && (
                        <Pricing selectedCategory={selectedCategory} />
                    )}

                    {selectedCategory && (
                        <Attributes selectedCategory={selectedCategory} />
                    )}

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
