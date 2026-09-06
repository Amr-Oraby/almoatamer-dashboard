import { useQuery } from "@tanstack/react-query";
import { getTransactions, getTransaction } from "./api";

export function useTransactions(page: number = 1) {
    return useQuery({
        queryKey: ["transactions", page],
        queryFn: () => getTransactions(page),
    });
}

export function useTransaction(id: string) {
    return useQuery({
        queryKey: ["transaction", id],
        queryFn: () => getTransaction(id),
        enabled: !!id,
    });
}
