import { Navigate, Outlet } from "react-router-dom";

import { Sidebar } from "../components/Sidebar/Sidebar";
import { useAuthStore } from "../store";

export const Dashboard = () => {
    const { user } = useAuthStore();
    if (user === null) {
        return <Navigate to="/auth/login" replace={true} />;
    }

    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    );
};
