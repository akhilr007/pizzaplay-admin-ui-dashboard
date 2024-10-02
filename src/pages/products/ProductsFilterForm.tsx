import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";

import { User } from "../Users/types";
import { ProductsFilter } from "./ProductsFilter";
import { FieldData } from "./types";

type Props = {
    onFilterChange: (changedFields: FieldData[]) => void;
    onAddProductClick: () => void;
    user: User;
};

export const ProductsFilterForm: React.FC<Props> = ({
    onFilterChange,
    onAddProductClick,
    user
}) => {
    const [filterForm] = Form.useForm();

    return (
        <Form form={filterForm} onFieldsChange={onFilterChange}>
            <ProductsFilter user={user}>
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
