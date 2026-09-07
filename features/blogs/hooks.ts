import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogsList, getBlogItem, deleteBlog } from "./api";
import { toast } from "sonner";

export function useBlogsList(page: number = 1) {
    return useQuery({
        queryKey: ["blogs", page],
        queryFn: () => getBlogsList(page),
    });
}

export function useBlogItem(id: string) {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => getBlogItem(id),
        enabled: !!id,
    });
}

export function useDeleteBlog() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBlog,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}
