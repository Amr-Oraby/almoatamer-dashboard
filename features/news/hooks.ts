import { useQuery } from "@tanstack/react-query";
import { getNewsList, getNewsItem } from "./api";

export function useNewsList(page: number = 1) {
    return useQuery({
        queryKey: ["news", page],
        queryFn: () => getNewsList(page),
    });
}

export function useNewsItem(id: string) {
    return useQuery({
        queryKey: ["news", id],
        queryFn: () => getNewsItem(id),
        enabled: !!id,
    });
}
