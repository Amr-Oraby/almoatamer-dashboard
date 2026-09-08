import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClients, getClient, getClientsWithoutPagination, toggleActivateClient } from "./api";
import { toast } from "sonner";

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

export function useToggleActivateClient() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleActivateClient,
        onSuccess: (data: any) => {
            toast.success(data.message || "تم تغيير حالة العميل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "فشلت العملية");
        },
    });
}
