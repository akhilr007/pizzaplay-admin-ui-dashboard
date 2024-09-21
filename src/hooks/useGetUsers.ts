import {
    keepPreviousData,
    QueryFunctionContext,
    useQuery
} from "@tanstack/react-query";

import { users } from "../http/api";

interface QueryParams {
    currentPage: number;
    perPage: number;
    q: string;
    role: string;
}

const getUsers = async ({
    queryKey
}: QueryFunctionContext<[string, QueryParams]>) => {
    const [, queryParams] = queryKey;

    const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
    );
    const queryString = new URLSearchParams(filteredParams).toString();
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
