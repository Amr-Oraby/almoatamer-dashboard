import { useQuery } from "@tanstack/react-query";
import { getLanguages, getLanguage } from "./api";

export function useLanguages(page: number = 1) {
    return useQuery({
        queryKey: ["languages", page],
        queryFn: () => getLanguages(page),
    });
}

export function useLanguage(id: string) {
    return useQuery({
        queryKey: ["language", id],
        queryFn: () => getLanguage(id),
        enabled: !!id,
    });
}
