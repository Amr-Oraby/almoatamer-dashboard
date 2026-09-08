import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHomeBanners, getHomeBanner, deleteHomeBanner, createHomeBanner } from "./api";
import { CreateHomeBannerFormValues } from "./schemas";
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

export function useCreateHomeBanner() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateHomeBannerFormValues) => createHomeBanner(data),
        onSuccess: (response) => {
            if (response.status === "success") {
                toast.success(response.message || "Created successfully");
                queryClient.invalidateQueries({ queryKey: ["home-banners"] });
            } else {
                toast.error(response.message || "Something went wrong");
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong");
        },
    });
}
