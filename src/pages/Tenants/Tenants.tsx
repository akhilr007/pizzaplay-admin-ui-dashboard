import { Form, Space, theme } from "antd";
import { debounce } from "lodash";
import { useState } from "react";
import React from "react";

import { PageContentHeader } from "../../components/PageContentHeader/PageContentHeader";
import { PER_PAGE } from "../../constants";
import { useCreateTenant } from "../../hooks/useCreateTenant";
import { useGetTenants } from "../../hooks/useGetTenants";
import { useUpdateTenant } from "../../hooks/useUpdateTenant";
import { Tenant } from "../Users/types";
import { TenantsDrawerForm } from "./form/TenantsDrawerForm";
import { TenantsFilterForm } from "./TenantsFilterForm";
import { TenantsTable } from "./TenantsTable";
import { CreateTenant, FieldData } from "./types";

export const Tenants = () => {
    const { colorBgLayout } = theme.useToken().token;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1,
        q: ""
    });
    const [editTenant, setEditTenant] = useState<Tenant | null>(null);
    const [form] = Form.useForm();

    const {
        data: tenants,
        isFetching,
        isError,
        error
    } = useGetTenants(queryParams);

    const {
        createTenantMutation: {
            mutate: createTenantMutate,
            isPending: isTenantCreated
        }
    } = useCreateTenant(() => {
        form.resetFields();
        setDrawerOpen(false);
    });

    const {
        updateTenantMutation: { mutate: updateTenantMutate }
    } = useUpdateTenant();

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

    const onFormSubmit = (values: CreateTenant) => {
        const isEditMode = !!editTenant;
        if (isEditMode) {
            const value = {
                tenant: values,
                id: editTenant.id
            };
            updateTenantMutate(value);
        } else {
            createTenantMutate(values);
        }

        setEditTenant(null);
    };

    const onEditTenant = (tenant: Tenant) => {
        setEditTenant(tenant);
        setDrawerOpen(true);
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
            <PageContentHeader
                title="Restaurants"
                isFetching={isFetching}
                isError={isError}
                error={error}
            />

            <TenantsFilterForm
                onFilterChange={onFilterChange}
                onAddUserClick={() => {
                    setEditTenant(null);
                    setDrawerOpen(true);
                }}
            />

            <TenantsTable
                users={tenants?.data}
                isLoading={isFetching}
                currentPage={queryParams.currentPage}
                perPage={queryParams.perPage}
                totalUsers={tenants?.total}
                onPageChange={(page: number) =>
                    setQueryParams((prev) => ({ ...prev, currentPage: page }))
                }
                onEditTenant={onEditTenant}
            />

            <TenantsDrawerForm
                form={form}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                onFormSubmit={onFormSubmit}
                colorBgLayout={colorBgLayout}
                editTenant={editTenant}
                isTenantCreated={isTenantCreated}
            />
        </Space>
    );
};
