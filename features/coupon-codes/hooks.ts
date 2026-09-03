import { useQuery } from "@tanstack/react-query";
import { getCouponCodes } from "./api";
import { CouponCodesResponse } from "@/app/types/CouponCodeType";

interface UseCouponCodesOptions {
  page?: number;
}

export function useCouponCodes({ page = 1 }: UseCouponCodesOptions = {}) {
  return useQuery<CouponCodesResponse>({
    queryKey: ["coupon-codes", { page }],
    queryFn: () => getCouponCodes(page),
  });
}
