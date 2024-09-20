import { Credentials } from "../components/Login/types";
import { CreateUser } from "../pages/Users/types";
import { api } from "./client";

// Auth service
export const login = (credentials: Credentials) =>
    api.post("/auth/login", credentials);

export const whoami = () => api.get("/auth/whoami");

export const logout = () => api.post("/auth/logout");

export const users = () => api.get("/users");

export const tenants = () => api.get("/tenants");

export const createUser = (user: CreateUser) => api.post("/users", user);
