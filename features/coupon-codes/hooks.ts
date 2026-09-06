import { useQuery } from "@tanstack/react-query";
import { getCouponCodes, getCouponCodeGroup } from "./api";

export function useCouponCodes(page: number = 1) {
    return useQuery({
        queryKey: ["coupon-codes", page],
        queryFn: () => getCouponCodes(page),
    });
}

export function useCouponCodeGroup(id: string) {
    return useQuery({
        queryKey: ["coupon-code-group", id],
        queryFn: () => getCouponCodeGroup(id),
        enabled: !!id,
    });
}
