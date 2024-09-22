import { Button, Drawer, Form, Space } from "antd";
import { useEffect } from "react";

import { Tenant } from "../../Users/types";
import { CreateTenant } from "../types";
import { TenantForm } from "./TenantForm";

type Props = {
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    onFormSubmit: (values: CreateTenant) => void;
    colorBgLayout: string;
    editTenant: Tenant | null;
};

export const TenantsDrawerForm: React.FC<Props> = ({
    drawerOpen,
    setDrawerOpen,
    onFormSubmit,
    colorBgLayout,
    editTenant
}) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        await form.validateFields();
        onFormSubmit(form.getFieldsValue());
        form.resetFields();
        setDrawerOpen(false);
    };

    useEffect(() => {
        if (editTenant) {
            form.setFieldsValue(editTenant);
        }
    }, [editTenant, form]);

    return (
        <Drawer
            title={editTenant ? "Edit Restaurant" : "Create New Restaurant"}
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
                <TenantForm />
            </Form>
        </Drawer>
    );
};
