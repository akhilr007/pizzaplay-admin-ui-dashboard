import { Form, Select } from "antd";

interface SelectFilterProps {
    name: string;
    placeholder: string;
    options: {
        label: string;
        value: string;
    }[];
}

export const Filter: React.FC<SelectFilterProps> = ({
    name,
    placeholder,
    options
}) => (
    <Form.Item name={name}>
        <Select
            placeholder={placeholder}
            allowClear={true}
            style={{ width: "100%" }}
        >
            {options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                    {option.label}
                </Select.Option>
            ))}
        </Select>
    </Form.Item>
);
