import { Card, Col, Row } from "antd";

import { SearchInput } from "../../components/SearchInput/SearchInput";

interface TenantFilterProps {
    children: React.ReactNode;
    onFilterChange: (filterName: string, filterValue: string) => void;
}

export const TenantFilter = ({
    onFilterChange,
    children
}: TenantFilterProps) => {
    return (
        <Card>
            <Row justify="space-between">
                <Col>
                    <SearchInput onFilterChange={onFilterChange} />
                </Col>
                <Col
                    span={8}
                    style={{ display: "flex", justifyContent: "end" }}
                >
                    {children}
                </Col>
            </Row>
        </Card>
    );
};
