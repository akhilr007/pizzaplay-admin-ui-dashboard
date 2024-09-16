import { useMutation } from "@tanstack/react-query";

import { logout } from "../http/api";
import { useAuthStore } from "../store";

export const useLogout = () => {
    const { logout: logoutFromStore } = useAuthStore();

    const logoutMutation = useMutation({
        mutationKey: ["logout"],
        mutationFn: logout,
        onSuccess: async () => {
            logoutFromStore();
        }
    });

    return {
        logoutMutation
    };
};
