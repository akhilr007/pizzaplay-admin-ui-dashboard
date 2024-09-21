import { Button, Drawer, Form, Space } from "antd";

import { CreateUser } from "../types";
import { UserForm } from "./UserForm";

type Props = {
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    onFormSubmit: (values: CreateUser) => void;
    colorBgLayout: string;
};

export const UserDrawerForm: React.FC<Props> = ({
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
            title="Create New User"
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
                <UserForm />
            </Form>
        </Drawer>
    );
};
