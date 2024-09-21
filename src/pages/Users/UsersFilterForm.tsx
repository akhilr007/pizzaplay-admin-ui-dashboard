import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";

import { FieldData } from "./types";
import { UsersFilter } from "./UsersFilter";

type Props = {
    onFilterChange: (changedFields: FieldData[]) => void;
    onAddUserClick: () => void;
};

export const UsersFilterForm: React.FC<Props> = ({
    onFilterChange,
    onAddUserClick
}) => {
    const [filterForm] = Form.useForm();

    return (
        <Form form={filterForm} onFieldsChange={onFilterChange}>
            <UsersFilter>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onAddUserClick}
                >
                    Add User
                </Button>
            </UsersFilter>
        </Form>
    );
};
