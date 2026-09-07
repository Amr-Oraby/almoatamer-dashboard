import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLanguages, getLanguage, deleteLanguage } from "./api";
import { toast } from "sonner";

export function useLanguages(page: number = 1) {
    return useQuery({
        queryKey: ["languages", page],
        queryFn: () => getLanguages(page),
    });
}

export function useLanguage(id: string) {
    return useQuery({
        queryKey: ["language", id],
        queryFn: () => getLanguage(id),
        enabled: !!id,
    });
}

export function useDeleteLanguage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteLanguage,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["languages"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}
