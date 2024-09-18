import Icon from "@ant-design/icons";
import { Space } from "antd";
import { ComponentType } from "react";

interface CardTitleProps {
    title: string;
    PrefixIcon: ComponentType<unknown>;
}

export const CardTitle = ({ title, PrefixIcon }: CardTitleProps) => {
    return (
        <Space>
            <Icon component={PrefixIcon} />
            {title}
        </Space>
    );
};
