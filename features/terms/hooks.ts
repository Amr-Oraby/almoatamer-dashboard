import { useQuery } from "@tanstack/react-query";
import { getTerms, getTerm } from "./api";

export function useTerms(page: number = 1) {
    return useQuery({
        queryKey: ["terms", page],
        queryFn: () => getTerms(page),
    });
}

export function useTerm(id: string) {
    return useQuery({
        queryKey: ["term", id],
        queryFn: () => getTerm(id),
        enabled: !!id,
    });
}
