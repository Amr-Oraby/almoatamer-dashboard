import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNewsList, getNewsItem, deleteNews, createNews, updateNews } from "./api";
import { toast } from "sonner";

export function useNewsList(page: number = 1, filters?: Record<string, string | null>) {
    return useQuery({
        queryKey: ["news", page, filters],
        queryFn: () => getNewsList(page, filters),
    });
}

export function useNewsItem(id: string) {
    return useQuery({
        queryKey: ["news", id],
        queryFn: () => getNewsItem(id),
        enabled: !!id,
    });
}

export function useDeleteNews() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteNews,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["news"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}

export function useCreateNews() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createNews,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تمت الإضافة بنجاح");
            queryClient.invalidateQueries({ queryKey: ["news"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الإضافة");
        },
    });
}

export function useUpdateNews(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => updateNews(id, formData),
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["news"] });
            queryClient.invalidateQueries({ queryKey: ["news", id] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء التعديل");
        },
    });
}
