// StatisticCard.js
import { Card, Col, Statistic } from "antd";

interface StatisticCardProps {
    title: string;
    value: number;
    precision?: number;
    prefix?: string;
}

export const StatisticCard = ({
    title,
    value,
    precision = 0,
    prefix
}: StatisticCardProps) => {
    return (
        <Col span={12}>
            <Card bordered={false}>
                <Statistic
                    title={title}
                    value={value}
                    precision={precision}
                    prefix={prefix}
                />
            </Card>
        </Col>
    );
};
