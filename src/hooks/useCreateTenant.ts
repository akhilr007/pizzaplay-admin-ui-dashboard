import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

import { createTenant } from "../http/api";
import { Tenant } from "../pages/Users/types";

export const useCreateTenant = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();
    const createTenantMutation = useMutation({
        mutationKey: ["createTenant"],
        mutationFn: async (tenant: Tenant) => {
            const { data } = await createTenant(tenant);
            return data;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["tenants"]
            });

            notification.success({
                message: "Restaurant created successfully",
                duration: 3,
                placement: "top"
            });

            onSuccess?.();
        },
        onError: () => {
            notification.error({
                message: "Failed to Create Restaurant",
                duration: 3,
                placement: "top"
            });
        }
    });

    return {
        createTenantMutation
    };
};
