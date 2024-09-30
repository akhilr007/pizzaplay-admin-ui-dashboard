import { Space } from "antd";
import { useState } from "react";

import { PageContentHeader } from "../../components/PageContentHeader/PageContentHeader";
import { ProductsFilterForm } from "./ProductsFilterForm";

export const Products = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const onFilterChange = () => {};

    return (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
            <PageContentHeader
                title="Products"
                // isFetching={''}
                // isError={''}
                // error={''}
            />

            <ProductsFilterForm
                onFilterChange={onFilterChange}
                onAddProductClick={() => {
                    setEditProduct(null);
                    setDrawerOpen(true);
                }}
            />
        </Space>
    );
};
