import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

import { createUser } from "../http/api";
import { CreateUser } from "../pages/Users/types";

export const useCreateUser = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();
    const createUserMutation = useMutation({
        mutationKey: ["createUser"],
        mutationFn: async (user: CreateUser) => {
            const { data } = await createUser(user);
            return data;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
            notification.success({
                message: "User created successfully",
                duration: 3,
                placement: "top"
            });
            onSuccess?.();
        },
        onError: async () => {
            notification.error({
                message: "User creation failed",
                duration: 3,
                placement: "top"
            });
        }
    });

    return {
        createUserMutation
    };
};
