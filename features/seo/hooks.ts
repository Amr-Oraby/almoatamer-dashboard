import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSeos, getSeo, deleteSeo } from "./api";
import { toast } from "sonner";

export function useSeos(page: number = 1) {
    return useQuery({
        queryKey: ["seo", page],
        queryFn: () => getSeos(page),
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
