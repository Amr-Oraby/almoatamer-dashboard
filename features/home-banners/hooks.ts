import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHomeBanners, getHomeBanner, deleteHomeBanner } from "./api";
import { toast } from "sonner";

export function useHomeBanners(page: number = 1) {
    return useQuery({
        queryKey: ["home-banners", page],
        queryFn: () => getHomeBanners(page),
    });
}

export function useHomeBanner(id: string) {
    return useQuery({
        queryKey: ["home-banner", id],
        queryFn: () => getHomeBanner(id),
        enabled: !!id,
    });
}

export function useDeleteHomeBanner() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteHomeBanner,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["home-banners"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}
