import { Credentials } from "../components/Login/types";
import { CreateUser, Tenant } from "../pages/Users/types";
import { api } from "./client";

// Auth service
export const login = (credentials: Credentials) =>
    api.post("/auth/login", credentials);

export const whoami = () => api.get("/auth/whoami");

export const logout = () => api.post("/auth/logout");

export const users = (queryString?: string) => api.get(`/users?${queryString}`);

export const createUser = (user: CreateUser) => api.post("/users", user);

export const updateUser = (user: CreateUser, id: number) =>
    api.patch(`/users/${id}`, user);

export const deleteUser = (id: number) => api.delete(`/users/${id}`);

export const tenants = (queryString?: string) =>
    api.get(`/tenants?${queryString}`);

export const createTenant = (tenant: Tenant) => api.post("/tenants", tenant);

export const updateTenant = (tenant: Tenant, id: number) =>
    api.patch(`/tenants/${id}`, tenant);
