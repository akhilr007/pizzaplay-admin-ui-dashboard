import { Outlet } from "react-router-dom";

export const NonAuth = () => {
    return (
        <div>
            <h1>Non Auth</h1>
            <Outlet />
        </div>
    );
};
