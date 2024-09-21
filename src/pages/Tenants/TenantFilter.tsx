import { Card, Col, Row } from "antd";

import { SearchInput } from "../../components/SearchInput/SearchInput";

interface TenantFilterProps {
    children: React.ReactNode;
}

export const TenantFilter = ({ children }: TenantFilterProps) => {
    return (
        <Card>
            <Row justify="space-between">
                <Col>
                    <SearchInput name="q" />
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
