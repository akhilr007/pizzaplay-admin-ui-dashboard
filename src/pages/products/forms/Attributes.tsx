import { Card, Col, Form, Radio, Row, Switch, Typography } from "antd";

import { Attribute, Category } from "../types";

type AttributeProps = {
    selectedCategory: Category;
};

export const Attributes: React.FC<AttributeProps> = ({ selectedCategory }) => {
    if (!selectedCategory) return null;

    return (
        <Card
            title={
                <Typography.Text style={{ fontSize: "16px" }}>
                    Attributes
                </Typography.Text>
            }
            bordered={false}
        >
            {selectedCategory.attributes.map((attribute: Attribute) => (
                <div key={attribute.name}>
                    {attribute.widgetType === "radio" ? (
                        <Form.Item
                            label={attribute.name}
                            name={["attributes", attribute.name]}
                            initialValue={attribute.defaultValue}
                            rules={[
                                {
                                    required: true,
                                    message: `${attribute.name} is required`
                                }
                            ]}
                        >
                            <Radio.Group>
                                {attribute.availableOptions.map((option) => (
                                    <Radio.Button key={option} value={option}>
                                        {option}
                                    </Radio.Button>
                                ))}
                            </Radio.Group>
                        </Form.Item>
                    ) : attribute.widgetType === "switch" ? (
                        <Row>
                            <Col>
                                <Form.Item
                                    label={attribute.name}
                                    name={["attributes", attribute.name]}
                                    valuePropName="checked"
                                    initialValue={attribute.defaultValue}
                                >
                                    <Switch
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    ) : null}
                </div>
            ))}
        </Card>
    );
};
