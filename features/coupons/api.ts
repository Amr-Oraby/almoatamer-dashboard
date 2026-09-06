import { apiClient } from "@/lib/api/client";
import { CouponsResponse, SingleCouponResponse } from "./types";

export async function getCoupons(page: number = 1): Promise<CouponsResponse> {
    return apiClient<CouponsResponse>(`/api/coupons?page=${page}`);
}

export async function getCoupon(id: string): Promise<SingleCouponResponse> {
    return apiClient<SingleCouponResponse>(`/api/show_coupon/${id}`);
}
