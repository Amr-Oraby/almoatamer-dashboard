import { apiClient } from "@/lib/api/client";
import { CouponCodesResponse } from "@/app/types/CouponCodeType";

export async function getCouponCodes(page: number = 1): Promise<CouponCodesResponse> {
  const url = `/api/coupon-codes?page=${page}`;
  return apiClient<CouponCodesResponse>(url);
}
