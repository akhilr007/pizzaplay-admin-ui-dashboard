import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";

import { SearchInput } from "../../components/SearchInput/SearchInput";
import { RoleFilter } from "./RoleFilter";
import { StatusFilter } from "./StatusFilter";

interface UserFilterProps {
    onFilterChange: (filterName: string, filterValue: string) => void;
}

export const UsersFilter = ({ onFilterChange }: UserFilterProps) => {
    return (
        <Card>
            <Row justify="space-between">
                <Col span={20}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <SearchInput onFilterChange={onFilterChange} />
                        </Col>
                        <Col span={4}>
                            <RoleFilter onFilterChange={onFilterChange} />
                        </Col>
                        <Col span={4}>
                            <StatusFilter onFilterChange={onFilterChange} />
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={4}
                    style={{ display: "flex", justifyContent: "end" }}
                >
                    <Button type="primary" icon={<PlusOutlined />}>
                        Add User
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};
