import { useQuery } from "@tanstack/react-query";
import { getClients, getClient, getClientsWithoutPagination } from "./api";

export function useClients(page: number = 1, filters?: Record<string, string | null>) {
    return useQuery({
        queryKey: ["clients", page, filters],
        queryFn: () => getClients(page, filters),
    });
}

export function useClientsWithoutPagination() {
    return useQuery({
        queryKey: ["clients-without-pagination"],
        queryFn: () => getClientsWithoutPagination(),
    });
}

export function useClient(id: string) {
    return useQuery({
        queryKey: ["client", id],
        queryFn: () => getClient(id),
        enabled: !!id,
    });
}
