import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useGetUser } from "../hooks/useGetUser";
import { useAuthStore } from "../store";

export const Root = () => {
    const { setUser } = useAuthStore();
    const { data, isLoading } = useGetUser(true).getSelfUser;

    useEffect(() => {
        if (data) {
            console.log("user: ", data);

            setUser(data);
        }
    }, [data, setUser]);

    if (isLoading) {
        return <div>...Loading</div>;
    }
    return <Outlet />;
};
