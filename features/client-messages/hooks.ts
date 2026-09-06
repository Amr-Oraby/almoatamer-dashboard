import { useQuery } from "@tanstack/react-query";
import { getClientMessages, getClientMessage } from "./api";

export function useClientMessages(page: number = 1) {
    return useQuery({
        queryKey: ["client-messages", page],
        queryFn: () => getClientMessages(page),
    });
}

export function useClientMessage(id: string) {
    return useQuery({
        queryKey: ["client-message", id],
        queryFn: () => getClientMessage(id),
        enabled: !!id,
    });
}
