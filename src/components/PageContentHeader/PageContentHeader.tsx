import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Flex, Spin, Typography } from "antd";
import { Link } from "react-router-dom";

interface Props {
    title: string;
    isFetching: boolean;
    isError: boolean;
    error: Error | null;
}

export const PageContentHeader: React.FC<Props> = ({
    title,
    isFetching,
    isError,
    error
}) => {
    return (
        <Flex justify="space-between">
            <Breadcrumb
                separator={<RightOutlined />}
                items={[
                    { title: <Link to="/">Dashboard</Link> },
                    { title: `${title}` }
                ]}
            />
            {isFetching && (
                <Spin
                    indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                />
            )}
            {isError && (
                <Typography.Text type="danger">
                    {error?.message}
                </Typography.Text>
            )}
        </Flex>
    );
};
