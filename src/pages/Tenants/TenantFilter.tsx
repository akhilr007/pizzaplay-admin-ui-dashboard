import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";

import { SearchInput } from "../../components/SearchInput/SearchInput";

interface TenantFilterProps {
    onFilterChange: (filterName: string, filterValue: string) => void;
}

export const TenantFilter = ({ onFilterChange }: TenantFilterProps) => {
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
                    <Button type="primary" icon={<PlusOutlined />}>
                        Add Tenant
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};
