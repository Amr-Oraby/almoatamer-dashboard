import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCoupons, getCoupon, deleteCoupon, toggleActivateCoupon } from "./api";
import { toast } from "sonner";

export function useCoupons(page: number = 1) {
    return useQuery({
        queryKey: ["coupons", page],
        queryFn: () => getCoupons(page),
    });
}

export function useCoupon(id: string) {
    return useQuery({
        queryKey: ["coupon", id],
        queryFn: () => getCoupon(id),
        enabled: !!id,
    });
}

export function useDeleteCoupon() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCoupon,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["coupons"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}

export function useToggleActivateCoupon() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleActivateCoupon,
        onSuccess: (data: any) => {
            toast.success(data.message || "تم تغيير حالة الكوبون بنجاح");
            queryClient.invalidateQueries({ queryKey: ["coupons"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "فشلت العملية");
        },
    });
}
