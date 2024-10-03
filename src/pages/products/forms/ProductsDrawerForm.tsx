import { Button, Drawer, Form, Space } from "antd";
import { useEffect } from "react";

import { Product } from "../types";
import { ProductForm } from "./ProductForm";

type Props = {
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    onFormSubmit: () => void;
    colorBgLayout: string;
    editProduct: Product | null;
};

export const ProductsDrawerForm: React.FC<Props> = ({
    drawerOpen,
    setDrawerOpen,
    onFormSubmit,
    colorBgLayout,
    editProduct
}) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        await form.validateFields();
        onFormSubmit(form.getFieldsValue());
        form.resetFields();
        setDrawerOpen(false);
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
                    <Button type="primary" onClick={handleSubmit}>
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
