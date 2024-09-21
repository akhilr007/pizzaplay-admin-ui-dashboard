import { Space, theme } from "antd";
import { debounce } from "lodash";
import { useState } from "react";
import React from "react";

import { PageContentHeader } from "../../components/PageContentHeader/PageContentHeader";
import { PER_PAGE } from "../../constants";
import { useCreateTenant } from "../../hooks/useCreateTenant";
import { useGetTenants } from "../../hooks/useGetTenants";
import { TenantsDrawerForm } from "./form/TenantsDrawerForm";
import { TenantsFilterForm } from "./TenantsFilterForm";
import { TenantsTable } from "./TenantsTable";
import { CreateTenant, FieldData } from "./types";

export const Tenant = () => {
    const { colorBgLayout } = theme.useToken().token;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1,
        q: ""
    });

    const {
        data: tenants,
        isFetching,
        isError,
        error
    } = useGetTenants(queryParams);

    const {
        createTenantMutation: { mutate: createTenantMutate }
    } = useCreateTenant();

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
        createTenantMutate(values);
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
            <PageContentHeader
                title="Tenants"
                isFetching={isFetching}
                isError={isError}
                error={error}
            />

            <TenantsFilterForm
                onFilterChange={onFilterChange}
                onAddUserClick={() => setDrawerOpen(true)}
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
            />

            <TenantsDrawerForm
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                onFormSubmit={onFormSubmit}
                colorBgLayout={colorBgLayout}
            />
        </Space>
    );
};
