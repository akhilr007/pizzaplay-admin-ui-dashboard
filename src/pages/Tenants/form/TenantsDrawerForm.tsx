import { Button, Drawer, Form, Space } from "antd";

import { CreateTenant } from "../types";
import { TenantForm } from "./TenantForm";

type Props = {
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    onFormSubmit: (values: CreateTenant) => void;
    colorBgLayout: string;
};

export const TenantsDrawerForm: React.FC<Props> = ({
    drawerOpen,
    setDrawerOpen,
    onFormSubmit,
    colorBgLayout
}) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        await form.validateFields();
        onFormSubmit(form.getFieldsValue());
        form.resetFields();
        setDrawerOpen(false);
    };

    return (
        <Drawer
            title="Create New Tenant"
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
