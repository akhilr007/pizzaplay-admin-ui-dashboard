import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "../store";

export const NonAuth = () => {
    const { search } = useLocation();
    const { user } = useAuthStore();
    if (user !== null) {
        const returnTo = new URLSearchParams(search).get("returnTo") || "/";
        return <Navigate to={`${returnTo}`} replace={true} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};
