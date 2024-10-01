import {
    keepPreviousData,
    QueryFunctionContext,
    useQuery
} from "@tanstack/react-query";

import { products } from "../http/api";

interface QueryParams {
    currentPage: number;
    perPage: number;
    q: string;
    role: string;
}

const getProducts = async ({
    queryKey
}: QueryFunctionContext<[string, QueryParams]>) => {
    const [, queryParams] = queryKey;

    const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const { data } = await products(queryString);
    console.log(data);
    return data;
};

export const useGetProducts = (queryParams: QueryParams) => {
    return useQuery({
        queryKey: ["products", queryParams],
        queryFn: getProducts,
        placeholderData: keepPreviousData
    });
};
