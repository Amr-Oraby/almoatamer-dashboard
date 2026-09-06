import { useQuery } from "@tanstack/react-query";
import { getPolicies, getPolicy } from "./api";

export function usePolicies(page: number = 1) {
    return useQuery({
        queryKey: ["policies", page],
        queryFn: () => getPolicies(page),
    });
}

export function usePolicy(id: string) {
    return useQuery({
        queryKey: ["policy", id],
        queryFn: () => getPolicy(id),
        enabled: !!id,
    });
}
