import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Credentials } from "../components/Login/types";
import { login } from "../http/api";
import { useAuthStore } from "../store";
import { useGetUser } from "./useGetUser";
import { useLogout } from "./useLogout";
import { usePermission } from "./usePermission";

const loginUser = async (credentials: Credentials) => {
    const { data } = await login(credentials);
    return data;
};

export const useLogin = () => {
    const { isAllowed } = usePermission();
    const { setUser } = useAuthStore();
    const {
        logoutMutation: { mutate: logoutMutate }
    } = useLogout();
    const {
        getSelfUser: { refetch }
    } = useGetUser();

    const loginMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: loginUser,
        onSuccess: async () => {
            const userDataPromise = await refetch();
            const user = userDataPromise.data;

            if (!isAllowed(user)) {
                logoutMutate();
                return;
            }

            setUser(user);
        },
        onError: async (error: AxiosError) => {
            const errors = (
                error.response?.data as { errors: { msg: string }[] }
            )?.errors;

            if (error && errors.length > 0) {
                error.message = errors[0].msg;
            } else {
                error.message = "An unknown error occurred. Please try again.";
            }
        }
    });

    return {
        loginMutation
    };
};
