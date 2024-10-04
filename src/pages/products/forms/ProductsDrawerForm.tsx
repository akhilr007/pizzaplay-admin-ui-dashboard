import { Button, Drawer, Form, FormInstance, Space } from "antd";
import { useEffect } from "react";

import { useAuthStore } from "../../../store";
import { makeFormData } from "../helper";
import { Product } from "../types";
import { ProductForm } from "./ProductForm";

type Props = {
    form: FormInstance;
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    onFormSubmit: (values: FormData) => void;
    colorBgLayout: string;
    editProduct: Product | null;
    isProductCreated: boolean;
};

export const ProductsDrawerForm: React.FC<Props> = ({
    form,
    drawerOpen,
    setDrawerOpen,
    onFormSubmit,
    colorBgLayout,
    editProduct,
    isProductCreated
}) => {
    const { user } = useAuthStore();

    const handleSubmit = async () => {
        await form.validateFields();
        const formPriceConfiguration = form.getFieldValue("priceConfiguration");
        const pricing = Object.entries(formPriceConfiguration).reduce(
            (acc, [key, value]) => {
                const parsedKey = JSON.parse(key);
                return {
                    ...acc,
                    [parsedKey.configurationKey]: {
                        priceType: parsedKey.priceType,
                        availableOptions: value
                    }
                };
            },
            {}
        );
        const formAttributes = form.getFieldValue("attributes");
        const attributes = Object.entries(formAttributes).map(
            ([key, value]) => {
                return {
                    name: key,
                    value: value
                };
            }
        );

        const postData = {
            ...form.getFieldsValue(),
            tenantId:
                user?.role === "manager"
                    ? user.tenant?.id
                    : form.getFieldValue("tenantId"),
            image: form.getFieldValue("image"),
            priceConfiguration: pricing,
            attributes
        };
        const formData = makeFormData(postData);

        onFormSubmit(formData);
    };

    // useEffect(() => {
    //     if (editProduct) {
    //         form.setFieldsValue({
    //             ...editProduct,
    //             tenantId: editProduct.tenant?.id
    //         });
    //     }
    // }, [editUser, form]);

    return (
        <Drawer
            title={editProduct ? "Edit Product" : "Create New Product"}
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
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={isProductCreated}
                    >
                        Submit
                    </Button>
                </Space>
            }
        >
            <Form form={form} layout="vertical">
                <ProductForm isEditMode={!!editProduct} />
            </Form>
        </Drawer>
    );
};
