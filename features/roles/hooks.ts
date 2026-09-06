import { useQuery } from "@tanstack/react-query";
import { getRoles, getRole } from "./api";

export function useRoles(page: number = 1) {
    return useQuery({
        queryKey: ["roles", page],
        queryFn: () => getRoles(page),
    });
}

export function useRole(id: string) {
    return useQuery({
        queryKey: ["role", id],
        queryFn: () => getRole(id),
        enabled: !!id,
    });
}
