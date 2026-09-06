import { useQuery } from "@tanstack/react-query";
import { getCouponCodes } from "./api";

export function useCouponCodes(page: number = 1) {
    return useQuery({
        queryKey: ["coupon-codes", page],
        queryFn: () => getCouponCodes(page),
    });
}
