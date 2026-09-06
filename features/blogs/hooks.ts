import { useQuery } from "@tanstack/react-query";
import { getBlogsList, getBlogItem } from "./api";

export function useBlogsList(page: number = 1) {
    return useQuery({
        queryKey: ["blogs", page],
        queryFn: () => getBlogsList(page),
    });
}

export function useBlogItem(id: string) {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => getBlogItem(id),
        enabled: !!id,
    });
}
