import { apiClient } from "@/lib/api/client";
import { ReferralLinksResponse, SingleReferralLinkResponse } from "./types";

export async function getReferralLinks(page: number = 1): Promise<ReferralLinksResponse> {
    return apiClient<ReferralLinksResponse>(`/api/referral-links?page=${page}`);
}

export async function getReferralLink(id: string): Promise<SingleReferralLinkResponse> {
    return apiClient<SingleReferralLinkResponse>(`/api/referral-link/${id}`);
}

export async function deleteReferralLink(id: string): Promise<any> {
    return apiClient<any>(`/api/delete-referral-link/${id}`, { method: 'DELETE' });
}

export async function createReferralLink(formData: FormData): Promise<any> {
    return apiClient<any>(`/api/create-referral-link`, {
        method: "POST",
        body: formData,
    });
}

export async function updateReferralLink(id: string, data: any): Promise<any> {
    return apiClient<any>(`/api/update-referral-link/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}
