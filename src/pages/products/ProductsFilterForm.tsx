import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";

import { ProductsFilter } from "./ProductsFilter";
import { FieldData } from "./types";

type Props = {
    onFilterChange: (changedFields: FieldData[]) => void;
    onAddProductClick: () => void;
};

export const ProductsFilterForm: React.FC<Props> = ({
    onFilterChange,
    onAddProductClick
}) => {
    const [filterForm] = Form.useForm();

    return (
        <Form form={filterForm} onFieldsChange={onFilterChange}>
            <ProductsFilter>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onAddProductClick}
                >
                    Add Product
                </Button>
            </ProductsFilter>
        </Form>
    );
};
