// src/hooks/useDeleteUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

import { deleteUser } from "../http/api";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    const deleteUserMutation = useMutation({
        mutationFn: async (id: number) => {
            const { data } = await deleteUser(id);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
            notification.success({
                message: "User deleted successfully",
                duration: 3
            });
        },
        onError: () => {
            notification.error({
                message: "Failed to delete user"
            });
        }
    });

    return { deleteUserMutation };
};
