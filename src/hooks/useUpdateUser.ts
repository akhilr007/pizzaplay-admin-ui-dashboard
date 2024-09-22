import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

import { updateUser } from "../http/api";
import { CreateUser } from "../pages/Users/types";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const updateUserMutation = useMutation({
        mutationKey: ["updateUser"],
        mutationFn: async (value: { user: CreateUser; id: number }) => {
            const { data } = await updateUser(value.user, value.id);
            return data;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
            notification.success({
                message: "User successfully updated",
                duration: 3
            });
        },
        onError: async () => {
            notification.error({
                message: "User failed to update"
            });
        }
    });

    return {
        updateUserMutation
    };
};
