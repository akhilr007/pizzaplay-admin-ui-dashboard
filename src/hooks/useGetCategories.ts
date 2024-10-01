import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { categories } from "../http/api";

const getCategories = async () => {
    const { data } = await categories();
    return data;
};

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        placeholderData: keepPreviousData
    });
};
