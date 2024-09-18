import { Navigate } from "react-router-dom";

import { Sidebar } from "../components/Sidebar/Sidebar";
import { useAuthStore } from "../store";

export const Dashboard = () => {
    const { user } = useAuthStore();

    if (user === null) {
        return <Navigate to="/auth/login" replace={true} />;
    }

    const { role } = user;
    return (
        <div>
            <Sidebar role={role} />
        </div>
    );
};
