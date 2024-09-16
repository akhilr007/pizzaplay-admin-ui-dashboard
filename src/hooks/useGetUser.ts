import { useQuery } from "@tanstack/react-query";

import { whoami } from "../http/api";

const getSelf = async () => {
    const { data } = await whoami();
    return data;
};

export const useGetUser = () => {
    const getSelfUser = useQuery({
        queryKey: ["whoami"],
        queryFn: getSelf,
        enabled: false
    });

    return {
        getSelfUser
    };
};
