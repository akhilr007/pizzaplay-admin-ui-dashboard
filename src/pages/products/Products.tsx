import { Space } from "antd";

import { PageContentHeader } from "../../components/PageContentHeader/PageContentHeader";

export const Products = () => {
    return (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
            <PageContentHeader
                title="Products"
                // isFetching={''}
                // isError={''}
                // error={''}
            />
        </Space>
    );
};
