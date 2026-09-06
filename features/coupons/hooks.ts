import { useQuery } from "@tanstack/react-query";
import { getCoupons, getCoupon } from "./api";

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
