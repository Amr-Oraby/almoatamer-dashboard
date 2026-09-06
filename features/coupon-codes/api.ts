import { apiClient } from "@/lib/api/client";
import { CouponCodesResponse, SingleCouponCodeGroupResponse } from "./types";

export async function getCouponCodes(page: number = 1): Promise<CouponCodesResponse> {
    return apiClient<CouponCodesResponse>(`/api/coupon-codes?page=${page}`);
}

export async function getCouponCodeGroup(id: string): Promise<SingleCouponCodeGroupResponse> {
    return apiClient<SingleCouponCodeGroupResponse>(`/api/coupon-codes/${id}`);
}
