import { Filter } from "../../components/Filter/Filter";

interface StatusFilterProps {
    onFilterChange: (filterName: string, filterValue: string) => void;
}

export const StatusFilter = ({ onFilterChange }: StatusFilterProps) => {
    const statusOptions = [
        { value: "ban", label: "Ban" },
        { value: "active", label: "Active" }
    ];
    return (
        <Filter
            placeholder="Status"
            options={statusOptions}
            filterName="status"
            onFilterChange={onFilterChange}
        />
    );
};
