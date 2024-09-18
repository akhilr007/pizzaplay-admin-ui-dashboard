// RecentOrders.js
import { Button, Card, Col, List, Row, Skeleton, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

import { OrderList } from "../../constants";
import { CardTitle } from "../CardTitle/CardTitle";
import { BasketIcon } from "../icons/BasketIcon";

const { Text } = Typography;

interface RecentOrderProps {
    list: OrderList[];
}

const RecentOrders = ({ list }: RecentOrderProps) => {
    return (
        <Card
            bordered={false}
            title={<CardTitle title="Recent orders" PrefixIcon={BasketIcon} />}
        >
            <List
                className="demo-loadmore-list"
                loading={false}
                itemLayout="horizontal"
                loadMore={true}
                dataSource={list}
                renderItem={(item) => (
                    <List.Item>
                        <Skeleton
                            avatar
                            title={false}
                            loading={item.loading}
                            active
                        >
                            <List.Item.Meta
                                title={
                                    <a href="https://ant.design">
                                        {item.OrderSummary}
                                    </a>
                                }
                                description={item.address}
                            />
                            <Row style={{ flex: 1 }} justify="space-between">
                                <Col>
                                    <Text strong>₹{item.amount}</Text>
                                </Col>
                                <Col>
                                    <Tag color="volcano">{item.status}</Tag>
                                </Col>
                            </Row>
                        </Skeleton>
                    </List.Item>
                )}
            />
            <div style={{ marginTop: 20 }}>
                <Button type="link">
                    <Link to="/orders">See all orders</Link>
                </Button>
            </div>
        </Card>
    );
};

export default RecentOrders;
