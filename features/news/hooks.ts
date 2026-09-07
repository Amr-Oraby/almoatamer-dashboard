import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNewsList, getNewsItem, deleteNews } from "./api";
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
