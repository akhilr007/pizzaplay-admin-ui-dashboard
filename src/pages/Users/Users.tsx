import { Form, Space, theme } from "antd";
import { debounce } from "lodash";
import React, { useState } from "react";

import { PageContentHeader } from "../../components/PageContentHeader/PageContentHeader";
import { PER_PAGE } from "../../constants";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useGetUsers } from "../../hooks/useGetUsers";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useAuthStore } from "../../store";
import { UserDrawerForm } from "./Forms/UsersDrawerForm";
import { CreateUser, FieldData, User } from "./types";
import { UsersFilterForm } from "./UsersFilterForm";
import { UsersTable } from "./UsersTable";

export const Users: React.FC = () => {
    const [form] = Form.useForm();
    const { colorBgLayout } = theme.useToken().token;
    const { user } = useAuthStore();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1,
        q: "",
        role: ""
    });
    const [editUser, setEditUser] = useState<User | null>(null);

    const {
        data: users,
        isFetching,
        isError,
        error
    } = useGetUsers(queryParams, user?.role === "admin");

    const {
        createUserMutation: {
            mutate: createUserMutate,
            isPending: isUserCreated
        }
    } = useCreateUser(() => {
        form.resetFields();
        setDrawerOpen(false);
    });

    const {
        updateUserMutation: { mutate: updateUserMutate }
    } = useUpdateUser();

    const {
        deleteUserMutation: { mutate: deleteUserMutate }
    } = useDeleteUser();

    const debouncedQUpdate = React.useMemo(
        () =>
            debounce((value: string) => {
                setQueryParams((prev) => ({
                    ...prev,
                    q: value,
                    currentPage: 1
                }));
            }, 500),
        []
    );

    const onFilterChange = (changedFields: FieldData[]) => {
        console.log(changedFields);

        const changedFilterFields = changedFields
            .map((field) => ({ [field.name[0]]: field.value }))
            .reduce((acc, field) => ({ ...acc, ...field }), {});

        if ("q" in changedFilterFields) {
            debouncedQUpdate(changedFilterFields.q ?? "");
        } else {
            setQueryParams((prev) => ({
                ...prev,
                ...changedFilterFields,
                currentPage: 1
            }));
        }
    };

    const onFormSubmit = (values: CreateUser) => {
        const isEditMode = !!editUser;
        if (isEditMode) {
            const value = {
                user: values,
                id: editUser.id
            };
            updateUserMutate(value);
        } else {
            createUserMutate(values);
        }

        setEditUser(null);
    };

    const onEditUser = (user: User) => {
        setEditUser(user);
        console.log(editUser);

        setDrawerOpen(true);
    };

    const onDeleteUser = (userId: number) => {
        deleteUserMutate(userId);
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
            <PageContentHeader
                title="Restaurants"
                isFetching={isFetching}
                isError={isError}
                error={error}
            />

            <UsersFilterForm
                onFilterChange={onFilterChange}
                onAddUserClick={() => {
                    setEditUser(null);
                    setDrawerOpen(true);
                }}
            />

            <UsersTable
                users={users?.data}
                isLoading={isFetching}
                currentPage={queryParams.currentPage}
                perPage={queryParams.perPage}
                totalUsers={users?.total}
                onPageChange={(page: number) =>
                    setQueryParams((prev) => ({ ...prev, currentPage: page }))
                }
                onEditUser={onEditUser}
                onDeleteUser={onDeleteUser}
            />

            <UserDrawerForm
                form={form}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                onFormSubmit={onFormSubmit}
                colorBgLayout={colorBgLayout}
                editUser={editUser}
                isUserCreated={isUserCreated}
            />
        </Space>
    );
};
