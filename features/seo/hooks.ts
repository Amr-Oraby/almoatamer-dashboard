import { useQuery } from "@tanstack/react-query";
import { getSeos, getSeo } from "./api";

export function useSeos(page: number = 1) {
    return useQuery({
        queryKey: ["seo", page],
        queryFn: () => getSeos(page),
    });
}

export function useSeo(id: string) {
    return useQuery({
        queryKey: ["seo", id],
        queryFn: () => getSeo(id),
        enabled: !!id,
    });
}
