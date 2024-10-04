// src/hooks/useDeleteUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

import { deleteProduct } from "../http/api";

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    const deleteProductMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await deleteProduct(id);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
            notification.success({
                message: "Product deleted successfully",
                duration: 3,
                placement: "top"
            });
        },
        onError: () => {
            notification.error({
                message: "Failed to delete Product"
            });
        }
    });

    return { deleteProductMutation };
};
