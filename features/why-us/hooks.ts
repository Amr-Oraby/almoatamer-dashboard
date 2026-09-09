import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWhyUsItems, getWhyUsItem, createWhyUsItem, updateWhyUsItem, deleteWhyUsItem } from "./api";
import { toast } from "sonner";

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

export function useCreateWhyUs() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Record<string, any>) => createWhyUsItem(data),
        onSuccess: (response: any) => {
            if (response.status === "success") {
                toast.success(response.message || "تم الإنشاء بنجاح");
                queryClient.invalidateQueries({ queryKey: ["why-us-items"] });
            } else {
                toast.error(response.message || "حدث خطأ ما");
            }
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الإنشاء");
        },
    });
}

export function useUpdateWhyUs(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Record<string, any>) => updateWhyUsItem(id, data),
        onSuccess: (response: any) => {
            if (response.status === "success") {
                toast.success(response.message || "تم التعديل بنجاح");
                queryClient.invalidateQueries({ queryKey: ["why-us-items"] });
                queryClient.invalidateQueries({ queryKey: ["why-us-item", id] });
            } else {
                toast.error(response.message || "حدث خطأ ما");
            }
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء التعديل");
        },
    });
}

export function useDeleteWhyUs() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteWhyUsItem,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["why-us-items"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}
