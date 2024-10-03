import { Form, Select } from "antd";

interface SelectFilterProps {
    name: string;
    placeholder: string;
    options: {
        label: string;
        value: string;
    }[];
    rules?: [{ required: boolean; message: string }];
    label?: string;
    onChange?: (value: string) => void;
}

export const Filter: React.FC<SelectFilterProps> = ({
    name,
    placeholder,
    options,
    rules = [],
    label,
    onChange
}) => (
    <Form.Item label={label} name={name} style={{ margin: 0 }} rules={rules}>
        <Select
            placeholder={placeholder}
            allowClear={true}
            style={{ width: "100%" }}
            onChange={onChange}
        >
            {options?.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                    {option.label}
                </Select.Option>
            ))}
        </Select>
    </Form.Item>
);
