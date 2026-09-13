import { apiClient } from "@/lib/api/client";
import { CouponCodesResponse } from "./types";

export async function getCouponCodes(page: number = 1): Promise<CouponCodesResponse> {
    return apiClient<CouponCodesResponse>(`/api/coupon-codes?page=${page}`);
}

export async function generateCouponCodes(data: FormData): Promise<any> {
    return apiClient<any>('/api/generate-coupon-codes', {
        method: 'POST',
        body: data,
    });
}

