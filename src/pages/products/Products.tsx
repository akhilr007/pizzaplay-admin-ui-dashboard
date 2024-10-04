import { Form, Space, theme } from "antd";
import { debounce } from "lodash";
import { useMemo, useState } from "react";

import { PageContentHeader } from "../../components/PageContentHeader/PageContentHeader";
import { PER_PAGE } from "../../constants";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useGetProducts } from "../../hooks/useGetProducts";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { useAuthStore } from "../../store";
import { ProductsDrawerForm } from "./forms/ProductsDrawerForm";
import { ProductsFilterForm } from "./ProductsFilterForm";
import { ProductsTable } from "./ProductsTable";
import { FieldData, Product } from "./types";

export const Products = () => {
    const { user } = useAuthStore();
    const { colorBgLayout } = theme.useToken().token;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [form] = Form.useForm();

    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1,
        q: "",
        categoryId: "",
        tenantId: user?.role === "manager" ? user?.tenant?.id : undefined,
        isPublished: ""
    });

    const {
        data: products,
        isFetching,
        isError,
        error
    } = useGetProducts(queryParams);

    const {
        createProductMutation: {
            mutate: createProductMutate,
            isPending: isProductCreated
        }
    } = useCreateProduct(() => {
        form.resetFields();
        setDrawerOpen(false);
    });

    const {
        updateProductMutation: {
            mutate: updateProductMutate,
            isPending: isProductUpdated
        }
    } = useUpdateProduct(() => {
        form.resetFields();
        setDrawerOpen(false);
    });

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

    const onFormSubmit = (data: FormData) => {
        if (editProduct) {
            const productData = {
                product: data,
                id: editProduct._id
            };
            updateProductMutate(productData);
        } else {
            createProductMutate(data);
        }
    };

    const onEditProduct = (product: Product) => {
        setEditProduct(product);
        setDrawerOpen(true);
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
                userRole={user?.role}
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
                onEditProduct={onEditProduct}
                // onDeleteUser={onDeleteUser}
            />

            <ProductsDrawerForm
                form={form}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                onFormSubmit={onFormSubmit}
                colorBgLayout={colorBgLayout}
                editProduct={editProduct}
                isProductCreated={isProductCreated || isProductUpdated}
            />
        </Space>
    );
};
