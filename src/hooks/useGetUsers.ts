import {
    keepPreviousData,
    QueryFunctionContext,
    useQuery
} from "@tanstack/react-query";

import { users } from "../http/api";

interface QueryParams {
    currentPage: number;
    perPage: number;
}

const getUsers = async ({
    queryKey
}: QueryFunctionContext<[string, QueryParams]>) => {
    const [, queryParams] = queryKey;
    const { currentPage, perPage } = queryParams;
    const queryString = new URLSearchParams({
        currentPage: currentPage.toString(),
        perPage: perPage.toString()
    }).toString();

    const { data } = await users(queryString);
    return data;
};

export const useGetUsers = (queryParams: QueryParams, isEnabled: boolean) => {
    return useQuery({
        queryKey: ["users", queryParams],
        queryFn: getUsers,
        enabled: isEnabled,
        placeholderData: keepPreviousData
    });
};
