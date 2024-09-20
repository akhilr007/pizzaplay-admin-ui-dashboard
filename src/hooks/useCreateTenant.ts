import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTenant } from "../http/api";
import { Tenant } from "../pages/Users/types";

export const useCreateTenant = () => {
    const queryClient = useQueryClient();
    const createTenantMutation = useMutation({
        mutationKey: ["createTenant"],
        mutationFn: async (tenant: Tenant) => {
            const { data } = await createTenant(tenant);
            return data;
        },
        onSuccess: async () => {
            console.log("Tenant created successfully");

            queryClient.invalidateQueries({
                queryKey: ["tenants"]
            });
        }
    });

    return {
        createTenantMutation
    };
};
