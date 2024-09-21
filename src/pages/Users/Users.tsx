import { Space, theme } from "antd";
import { debounce } from "lodash";
import React, { useState } from "react";

import { PageContentHeader } from "../../components/PageContentHeader/PageContentHeader";
import { PER_PAGE } from "../../constants";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useGetUsers } from "../../hooks/useGetUsers";
import { useAuthStore } from "../../store";
import { UserDrawerForm } from "./Forms/UsersDrawerForm";
import { CreateUser, FieldData } from "./types";
import { UsersFilterForm } from "./UsersFilterForm";
import { UsersTable } from "./UsersTable";

export const Users: React.FC = () => {
    const { colorBgLayout } = theme.useToken().token;
    const { user } = useAuthStore();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1,
        q: "",
        role: ""
    });

    const {
        data: users,
        isFetching,
        isError,
        error
    } = useGetUsers(queryParams, user?.role === "admin");

    const {
        createUserMutation: { mutate: createUserMutate }
    } = useCreateUser();

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
        createUserMutate(values);
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
                onAddUserClick={() => setDrawerOpen(true)}
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
            />

            <UserDrawerForm
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                onFormSubmit={onFormSubmit}
                colorBgLayout={colorBgLayout}
            />
        </Space>
    );
};
