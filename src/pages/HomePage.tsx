import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";

import RecentOrders from "../components/RecentOrders/RecentOrders";
import { SalesCard } from "../components/SalesCard/SalesCard";
import { StatisticCard } from "../components/StatisticCard/StatisticCard";
import { list } from "../constants";
import { useAuthStore } from "../store";

export const HomePage = () => {
    const { user } = useAuthStore();

    return (
        <div>
            <Title level={4}>Welcome, {user?.firstName}</Title>
            <Row className="mt-4" gutter={16}>
                <Col span={12}>
                    <Row gutter={[16, 16]}>
                        <StatisticCard
                            title="Total orders"
                            value={52}
                            prefix=""
                        />
                        <StatisticCard
                            title="Total sale"
                            value={70000}
                            precision={2}
                            prefix="₹"
                        />
                        <SalesCard />
                    </Row>
                </Col>
                <Col span={12}>
                    <RecentOrders list={list} />
                </Col>
            </Row>
        </div>
    );
};
