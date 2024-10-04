import { Button, Drawer, Form, FormInstance, Space } from "antd";
import { useEffect } from "react";

import { CreateUser, User } from "../types";
import { UserForm } from "./UserForm";

type Props = {
    form: FormInstance;
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    onFormSubmit: (values: CreateUser) => void;
    colorBgLayout: string;
    editUser: User | null;
    isUserCreated: boolean;
};

export const UserDrawerForm: React.FC<Props> = ({
    form,
    drawerOpen,
    setDrawerOpen,
    onFormSubmit,
    colorBgLayout,
    editUser,
    isUserCreated
}) => {
    const handleSubmit = async () => {
        await form.validateFields();
        onFormSubmit(form.getFieldsValue());
    };

    useEffect(() => {
        if (editUser) {
            form.setFieldsValue({ ...editUser, tenantId: editUser.tenant?.id });
        }
    }, [editUser, form]);

    return (
        <Drawer
            title={editUser ? "Edit User" : "Create New User"}
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
                        loading={isUserCreated}
                    >
                        Submit
                    </Button>
                </Space>
            }
        >
            <Form form={form} layout="vertical">
                <UserForm isEditMode={!!editUser} />
            </Form>
        </Drawer>
    );
};
