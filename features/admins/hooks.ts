import { useQuery } from "@tanstack/react-query";
import { getAdmins, getAdmin } from "./api";

export function useAdmins(page: number = 1) {
    return useQuery({
        queryKey: ["admins", page],
        queryFn: () => getAdmins(page),
    });
}

export function useAdmin(id: string) {
    return useQuery({
        queryKey: ["admin", id],
        queryFn: () => getAdmin(id),
        enabled: !!id,
    });
}
