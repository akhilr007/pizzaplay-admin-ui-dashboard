import {
    Card,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Space,
    Typography
} from "antd";

import { Category } from "../types";

type PricingProps = {
    selectedCategory: Category;
};

export const Pricing: React.FC<PricingProps> = ({ selectedCategory }) => {
    if (!selectedCategory) return null;

    return (
        <Card
            title={
                <Typography.Text style={{ fontSize: "16px" }}>
                    Product Price
                </Typography.Text>
            }
            bordered={false}
        >
            {Object.entries(selectedCategory.priceConfiguration).map(
                ([configurationKey, configurationValue]) => (
                    <div key={configurationKey}>
                        <Space
                            direction="vertical"
                            size="large"
                            style={{ width: "100%" }}
                        >
                            <Typography.Text>
                                {`${configurationKey} (${configurationValue.priceType})`}
                            </Typography.Text>
                        </Space>
                        <Row gutter={20}>
                            {configurationValue.availableOptions.map(
                                (option: string) => (
                                    <Col
                                        key={option}
                                        span={8}
                                        style={{ marginTop: "5px" }}
                                    >
                                        <Form.Item
                                            name={[
                                                "priceConfiguration",
                                                JSON.stringify({
                                                    configurationKey:
                                                        configurationKey,
                                                    priceType:
                                                        configurationValue.priceType
                                                }),
                                                option
                                            ]}
                                            label={option}
                                        >
                                            <InputNumber addonAfter="₹" />
                                        </Form.Item>
                                    </Col>
                                )
                            )}
                        </Row>
                    </div>
                )
            )}
        </Card>
    );
};
