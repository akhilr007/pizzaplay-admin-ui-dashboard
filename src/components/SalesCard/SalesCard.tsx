// SalesCard.js
import { Card, Col } from "antd";

import { CardTitle } from "../CardTitle/CardTitle";
import { BarChartIcon } from "../icons/BarChart";

export const SalesCard = () => {
    return (
        <Col span={24}>
            <Card
                title={<CardTitle title="Sales" PrefixIcon={BarChartIcon} />}
                bordered={false}
            >
                {/* Future content for sales chart */}
            </Card>
        </Col>
    );
};
