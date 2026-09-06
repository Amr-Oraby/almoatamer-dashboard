import { useQuery } from "@tanstack/react-query";
import { getWhyUsItems, getWhyUsItem } from "./api";

export function useWhyUsItems(page: number = 1) {
    return useQuery({
        queryKey: ["why-us-items", page],
        queryFn: () => getWhyUsItems(page),
    });
}

export function useWhyUsItem(id: string) {
    return useQuery({
        queryKey: ["why-us-item", id],
        queryFn: () => getWhyUsItem(id),
        enabled: !!id,
    });
}
