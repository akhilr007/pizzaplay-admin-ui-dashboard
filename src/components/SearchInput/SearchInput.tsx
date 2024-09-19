import { Input } from "antd";

interface SearchInputProps {
    onFilterChange: (filterName: string, filterValue: string) => void;
}

export const SearchInput = ({ onFilterChange }: SearchInputProps) => {
    return (
        <Input.Search
            placeholder="search"
            allowClear={true}
            onChange={(e) => onFilterChange("searchFilter", e.target.value)}
        />
    );
};
