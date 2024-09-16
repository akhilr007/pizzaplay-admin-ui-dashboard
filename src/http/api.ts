import { Credentials } from "../components/Login/types";
import { api } from "./client";

// Auth service
export const login = (credentials: Credentials) =>
    api.post("/auth/login", credentials);

export const whoami = () => api.get("/auth/whoami");

export const logout = () => api.post("/auth/logout");
