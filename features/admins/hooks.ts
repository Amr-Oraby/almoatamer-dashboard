import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdmins, getAdmin, deleteAdmin } from "./api";
import { toast } from "sonner";

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

export function useDeleteAdmin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAdmin,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}
