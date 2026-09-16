import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdmins, getAdmin, deleteAdmin, createAdmin, updateAdmin } from "./api";
import { toast } from "sonner";

export function useAdmins(page: number = 1, filters?: Record<string, string | null>) {
    return useQuery({
        queryKey: ["admins", page, filters],
        queryFn: () => getAdmins(page, filters),
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

export function useCreateAdmin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAdmin,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم إنشاء المشرف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الإنشاء");
        },
    });
}

export function useUpdateAdmin(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => updateAdmin(id, formData),
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم التحديث بنجاح");
            queryClient.invalidateQueries({ queryKey: ["admin", id] });
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء التحديث");
        },
    });
}
