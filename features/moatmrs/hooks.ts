import { useQuery } from "@tanstack/react-query";
import { getMoatmrs, getMoatmr } from "./api";

export function useMoatmrs(page: number = 1) {
    return useQuery({
        queryKey: ["moatmrs", page],
        queryFn: () => getMoatmrs(page),
    });
}

export function useMoatmr(id: string) {
    return useQuery({
        queryKey: ["moatmr", id],
        queryFn: () => getMoatmr(id),
        enabled: !!id,
    });
}
