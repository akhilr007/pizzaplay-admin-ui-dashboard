import axios, { HttpStatusCode } from "axios";

import { useAuthStore } from "../store";
import { AUTH_SERVICE } from "./api";

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_API_URL}`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

const refreshToken = async () => {
    await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}${AUTH_SERVICE}/auth/refresh`,
        {},
        { withCredentials: true }
    );
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response.status === HttpStatusCode.Unauthorized &&
            !originalRequest._isRetry &&
            originalRequest.url !== "/auth/login"
        ) {
            try {
                originalRequest._isRetry = true;
                const headers = { ...originalRequest.headers };
                await refreshToken();
                return api.request({ ...originalRequest, headers });
            } catch (error) {
                useAuthStore.getState().logout();
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);
