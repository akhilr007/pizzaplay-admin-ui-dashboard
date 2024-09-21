import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";

import { TenantFilter } from "./TenantFilter";
import { FieldData } from "./types";

type Props = {
    onFilterChange: (changedFields: FieldData[]) => void;
    onAddUserClick: () => void;
};

export const TenantsFilterForm: React.FC<Props> = ({
    onFilterChange,
    onAddUserClick
}) => {
    const [filterForm] = Form.useForm();

    return (
        <Form form={filterForm} onFieldsChange={onFilterChange}>
            <TenantFilter>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onAddUserClick}
                >
                    Add User
                </Button>
            </TenantFilter>
        </Form>
    );
};
