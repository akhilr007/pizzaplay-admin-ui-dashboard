import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";

import { ProductsFilter } from "./ProductsFilter";
import { FieldData } from "./types";

type Props = {
    onFilterChange: (changedFields: FieldData[]) => void;
    onAddProductClick: () => void;
    userRole: string | undefined;
};

export const ProductsFilterForm: React.FC<Props> = ({
    onFilterChange,
    onAddProductClick,
    userRole
}) => {
    const [filterForm] = Form.useForm();

    return (
        <Form form={filterForm} onFieldsChange={onFilterChange}>
            <ProductsFilter userRole={userRole}>
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
