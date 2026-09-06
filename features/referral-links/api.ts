import { apiClient } from "@/lib/api/client";
import { ReferralLinksResponse, SingleReferralLinkResponse } from "./types";

export async function getReferralLinks(page: number = 1): Promise<ReferralLinksResponse> {
    return apiClient<ReferralLinksResponse>(`/api/referral-links?page=${page}`);
}

export async function getReferralLink(id: string): Promise<SingleReferralLinkResponse> {
    return apiClient<SingleReferralLinkResponse>(`/api/referral-links/${id}`);
}
