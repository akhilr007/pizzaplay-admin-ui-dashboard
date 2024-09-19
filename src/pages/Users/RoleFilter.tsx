import { Filter } from "../../components/Filter/Filter";

interface RoleFilterProps {
    onFilterChange: (filterName: string, filterValue: string) => void;
}
export const RoleFilter = ({ onFilterChange }: RoleFilterProps) => {
    const roleOptions = [
        { value: "admin", label: "Admin" },
        { value: "manager", label: "Manager" },
        { value: "customer", label: "Customer" }
    ];
    return (
        <Filter
            placeholder="Role"
            options={roleOptions}
            filterName="role"
            onFilterChange={onFilterChange}
        />
    );
};
