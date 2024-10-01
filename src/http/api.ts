import { Credentials } from "../components/Login/types";
import { CreateUser, Tenant } from "../pages/Users/types";
import { api } from "./client";

export const AUTH_SERVICE = "/api/v1";
// Auth service
export const login = (credentials: Credentials) =>
    api.post(`${AUTH_SERVICE}/auth/login`, credentials);

export const whoami = () => api.get(`${AUTH_SERVICE}/auth/whoami`);

export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`);

export const users = (queryString?: string) =>
    api.get(`${AUTH_SERVICE}/users?${queryString}`);

export const createUser = (user: CreateUser) =>
    api.post(`${AUTH_SERVICE}/users`, user);

export const updateUser = (user: CreateUser, id: number) =>
    api.patch(`${AUTH_SERVICE}/users/${id}`, user);

export const deleteUser = (id: number) =>
    api.delete(`${AUTH_SERVICE}/users/${id}`);

export const tenants = (queryString?: string) =>
    api.get(`${AUTH_SERVICE}/tenants?${queryString}`);

export const createTenant = (tenant: Tenant) =>
    api.post(`${AUTH_SERVICE}/tenants`, tenant);

export const updateTenant = (tenant: Tenant, id: number) =>
    api.patch(`${AUTH_SERVICE}/tenants/${id}`, tenant);

// Categories
const CATALOG_SERVICE = "/api/v1";
export const categories = () => api.get(`${CATALOG_SERVICE}/categories`);

export const products = (queryString?: string) =>
    api.get(`${CATALOG_SERVICE}/products?${queryString}`);
