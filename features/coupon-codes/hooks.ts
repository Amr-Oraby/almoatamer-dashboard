import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCouponCodes, generateCouponCodes } from "./api";
import { toast } from "sonner";

export function useCouponCodes(page: number = 1) {
    return useQuery({
        queryKey: ["coupon-codes", page],
        queryFn: () => getCouponCodes(page),
    });
}

export function useGenerateCouponCodes() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => generateCouponCodes(data),
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم إنشاء الأكواد بنجاح");
            queryClient.invalidateQueries({ queryKey: ["coupon-codes"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الإنشاء");
        },
    });
}
