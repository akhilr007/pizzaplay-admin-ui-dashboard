import { Form, Switch } from "antd";

interface SwitchFilterProps {
    name: string;
    isOn: string;
    isOff: string;
}

export const SwitchComponent: React.FC<SwitchFilterProps> = ({
    name,
    isOn,
    isOff
}) => {
    return (
        <Form.Item name={name} style={{ margin: 0 }}>
            <Switch
                defaultChecked={false}
                onChange={() => {}}
                checkedChildren={isOn}
                unCheckedChildren={isOff}
                size="default"
            />
        </Form.Item>
    );
};
