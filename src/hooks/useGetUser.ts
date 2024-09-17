import { useQuery } from "@tanstack/react-query";
import { AxiosError, HttpStatusCode } from "axios";

import { whoami } from "../http/api";

const getSelf = async () => {
    const { data } = await whoami();
    return data;
};

export const useGetUser = (isEnabled = false) => {
    const getSelfUser = useQuery({
        queryKey: ["whoami"],
        queryFn: getSelf,
        enabled: isEnabled,
        retry: (failureCount: number, error) => {
            if (
                error instanceof AxiosError &&
                error.response?.status === HttpStatusCode.Unauthorized
            ) {
                return false;
            }

            return failureCount < 2;
        }
    });

    return {
        getSelfUser
    };
};
