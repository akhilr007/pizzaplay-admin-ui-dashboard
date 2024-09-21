import { Form, Input } from "antd";

import { FilterProps } from "../../pages/Users/types";

export const SearchInput: React.FC<FilterProps> = ({ name }) => {
    return (
        <Form.Item name={name}>
            <Input.Search placeholder="search" allowClear={true} />
        </Form.Item>
    );
};
