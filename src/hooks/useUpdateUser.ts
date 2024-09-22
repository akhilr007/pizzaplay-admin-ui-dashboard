import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        }
    });

    return {
        updateUserMutation
    };
};
