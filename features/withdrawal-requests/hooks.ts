import { useQuery } from "@tanstack/react-query";
import { getWithdrawalRequests, getWithdrawalRequest } from "./api";

export function useWithdrawalRequests(page: number = 1) {
    return useQuery({
        queryKey: ["withdrawal-requests", page],
        queryFn: () => getWithdrawalRequests(page),
    });
}

export function useWithdrawalRequest(id: string) {
    return useQuery({
        queryKey: ["withdrawal-request", id],
        queryFn: () => getWithdrawalRequest(id),
        enabled: !!id,
    });
}
