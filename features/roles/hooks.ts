import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRoles, getRole, deleteRole } from "./api";
import { toast } from "sonner";

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

export function useDeleteRole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRole,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}
