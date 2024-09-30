import { createBrowserRouter } from "react-router-dom";

import { Dashboard } from "./layouts/Dashboard";
import { NonAuth } from "./layouts/NonAuth";
import { Root } from "./layouts/Root";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/login/Login";
import { Products } from "./pages/products/Products";
import { Tenants } from "./pages/Tenants/Tenants";
import { Users } from "./pages/Users/Users";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Dashboard />,
                children: [
                    {
                        path: "",
                        element: <HomePage />
                    },
                    {
                        path: "users",
                        element: <Users />
                    },
                    {
                        path: "restaurants",
                        element: <Tenants />
                    },
                    {
                        path: "products",
                        element: <Products />
                    }
                ]
            },
            {
                path: "/auth",
                element: <NonAuth />,
                children: [
                    {
                        path: "login",
                        element: <LoginPage />
                    }
                ]
            }
        ]
    }
]);
