import { Select } from "antd";

interface FilterProps {
    placeholder: string;
    options: { value: string; label: string }[];
    filterName: string;
    onFilterChange: (filterName: string, filterValue: string) => void;
}

export const Filter: React.FC<FilterProps> = ({
    placeholder,
    options,
    filterName,
    onFilterChange
}) => (
    <Select
        placeholder={placeholder}
        allowClear={true}
        style={{ width: "100%" }}
        onChange={(selectedItem) =>
            onFilterChange(`${filterName}Filter`, selectedItem)
        }
    >
        {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
                {option.label}
            </Select.Option>
        ))}
    </Select>
);
