import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

import { updateTenant } from "../http/api";
import { CreateTenant } from "../pages/Tenants/types";

export const useUpdateTenant = () => {
    const queryClient = useQueryClient();
    const updateTenantMutation = useMutation({
        mutationKey: ["updateTenant"],
        mutationFn: async (value: { tenant: CreateTenant; id: number }) => {
            const { data } = await updateTenant(value.tenant, value.id);
            return data;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["tenants"]
            });
            notification.success({
                message: "Restaurant successfully updated",
                duration: 3
            });
        },
        onError: async () => {
            notification.error({
                message: "Tenant failed to update"
            });
        }
    });

    return {
        updateTenantMutation
    };
};
