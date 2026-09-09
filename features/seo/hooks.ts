import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSeos, getSeo, deleteSeo, toggleActivateSeo, createSeo } from "./api";
import { toast } from "sonner";

export function useSeos(page: number = 1, filters?: Record<string, string | null>) {
    return useQuery({
        queryKey: ["seo", page, filters],
        queryFn: () => getSeos(page, filters),
    });
}

export function useSeo(id: string) {
    return useQuery({
        queryKey: ["seo", id],
        queryFn: () => getSeo(id),
        enabled: !!id,
    });
}

export function useDeleteSeo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteSeo,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["seo"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}

export function useToggleActivateSeo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleActivateSeo,
        onSuccess: (data: any) => {
            toast.success(data.message || "تم تغيير حالة الـ SEO بنجاح");
            queryClient.invalidateQueries({ queryKey: ["seo"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "فشلت العملية");
        },
    });
}

export function useCreateSeo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSeo,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تمت الإضافة بنجاح");
            queryClient.invalidateQueries({ queryKey: ["seo"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الإضافة");
        },
    });
}
