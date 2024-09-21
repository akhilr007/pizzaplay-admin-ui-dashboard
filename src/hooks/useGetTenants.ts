import {
    keepPreviousData,
    QueryFunctionContext,
    useQuery
} from "@tanstack/react-query";

import { tenants } from "../http/api";

interface QueryParams {
    currentPage: number;
    perPage: number;
    q: string;
}

const getTenants = async ({
    queryKey
}: QueryFunctionContext<[string, QueryParams]>) => {
    const [, queryParams] = queryKey;

    const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const { data } = await tenants(queryString);
    return data;
};

export const useGetTenants = (queryParams: QueryParams) => {
    return useQuery({
        queryKey: ["tenants", queryParams],
        queryFn: getTenants,
        placeholderData: keepPreviousData
    });
};
