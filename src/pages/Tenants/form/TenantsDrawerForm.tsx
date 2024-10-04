import { Button, Drawer, Form, FormInstance, Space } from "antd";
import { useEffect } from "react";

import { Tenant } from "../../Users/types";
import { CreateTenant } from "../types";
import { TenantForm } from "./TenantForm";

type Props = {
    form: FormInstance;
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    onFormSubmit: (values: CreateTenant) => void;
    colorBgLayout: string;
    editTenant: Tenant | null;
    isTenantCreated: boolean;
};

export const TenantsDrawerForm: React.FC<Props> = ({
    form,
    drawerOpen,
    setDrawerOpen,
    onFormSubmit,
    colorBgLayout,
    editTenant,
    isTenantCreated
}) => {
    const handleSubmit = async () => {
        await form.validateFields();
        onFormSubmit(form.getFieldsValue());
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
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={isTenantCreated}
                    >
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
