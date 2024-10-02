import { Space } from "antd";
import { debounce } from "lodash";
import { useMemo, useState } from "react";

import { PageContentHeader } from "../../components/PageContentHeader/PageContentHeader";
import { PER_PAGE } from "../../constants";
import { useGetProducts } from "../../hooks/useGetProducts";
import { ProductsFilterForm } from "./ProductsFilterForm";
import { ProductsTable } from "./ProductsTable";
import { FieldData } from "./types";

export const Products = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1,
        q: "",
        role: ""
    });

    const {
        data: products,
        isFetching,
        isError,
        error
    } = useGetProducts(queryParams);

    const debouncedQUpdate = useMemo(
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

        console.log(changedFilterFields);

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

    return (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
            <PageContentHeader
                title="Products"
                isFetching={isFetching}
                isError={isError}
                error={error}
            />

            <ProductsFilterForm
                onFilterChange={onFilterChange}
                onAddProductClick={() => {
                    setEditProduct(null);
                    setDrawerOpen(true);
                }}
            />

            <ProductsTable
                products={products?.data}
                isLoading={isFetching}
                currentPage={queryParams.currentPage}
                perPage={queryParams.perPage}
                total={products?.data?.total}
                onPageChange={(page: number) =>
                    setQueryParams((prev) => ({ ...prev, currentPage: page }))
                }
                // onEditUser={onEditUser}
                // onDeleteUser={onDeleteUser}
            />
        </Space>
    );
};
