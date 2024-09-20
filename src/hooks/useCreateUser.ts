import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUser } from "../http/api";
import { CreateUser } from "../pages/Users/types";

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    const createUserMutation = useMutation({
        mutationKey: ["createUser"],
        mutationFn: async (user: CreateUser) => {
            const { data } = await createUser(user);
            console.log(data);
            return data;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        }
    });

    return {
        createUserMutation
    };
};
