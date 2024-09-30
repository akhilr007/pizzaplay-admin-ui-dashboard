import { Space, Switch, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";

export const SwitchComponent = () => {
    return (
        <FormItem style={{ margin: 0 }}>
            <Space>
                <Switch defaultChecked onChange={() => {}} />
                <Typography.Text>Show only published</Typography.Text>
            </Space>
        </FormItem>
    );
};
