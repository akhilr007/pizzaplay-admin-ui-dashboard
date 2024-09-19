import { Layout, Spin } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useGetUser } from "../hooks/useGetUser";
import { useAuthStore } from "../store";

export const Root = () => {
    const { setUser } = useAuthStore();
    const { data, isLoading } = useGetUser(true).getSelfUser;

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data, setUser]);

    if (isLoading) {
        return (
            <Layout>
                <Spin
                    size="large"
                    style={{
                        placeItems: "center",
                        height: "100vh",
                        display: "grid"
                    }}
                ></Spin>
            </Layout>
        );
    }
    return <Outlet />;
};
