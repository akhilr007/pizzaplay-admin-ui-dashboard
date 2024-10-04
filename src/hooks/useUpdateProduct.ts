import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

import { updateProduct } from "../http/api";

export const useUpdateProduct = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();
    const updateProductMutation = useMutation({
        mutationKey: ["updateProduct"],
        mutationFn: async (productData: { product: FormData; id: string }) => {
            const { data } = await updateProduct(
                productData.product,
                productData.id
            );
            return data;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
            notification.success({
                message: "Product successfully updated",
                duration: 3,
                placement: "top"
            });
            onSuccess?.();
        },
        onError: async () => {
            notification.error({
                message: "Product failed to update",
                duration: 3,
                placement: "top"
            });
        }
    });

    return {
        updateProductMutation
    };
};
