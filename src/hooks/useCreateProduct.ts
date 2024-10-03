import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

import { createProduct } from "../http/api";

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const createProductMutation = useMutation({
        mutationKey: ["createProduct"],
        mutationFn: async (product: FormData) => {
            const { data } = await createProduct(product);
            return data;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
            notification.success({
                message: "Product successfully created",
                duration: 3
            });
        }
    });

    return {
        createProductMutation
    };
};
