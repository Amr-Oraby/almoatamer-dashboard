import { useQuery } from "@tanstack/react-query";
import { getWithdrawalRequests } from "./api";

export function useWithdrawalRequests(page: number = 1) {
    return useQuery({
        queryKey: ["withdrawal-requests", page],
        queryFn: () => getWithdrawalRequests(page),
    });
}


