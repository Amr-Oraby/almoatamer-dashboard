import { useQuery } from "@tanstack/react-query";
import { getClients, getClient } from "./api";

export function useClients(page: number = 1) {
    return useQuery({
        queryKey: ["clients", page],
        queryFn: () => getClients(page),
    });
}

export function useClient(id: string) {
    return useQuery({
        queryKey: ["client", id],
        queryFn: () => getClient(id),
        enabled: !!id,
    });
}
