import { apiClient } from "@/lib/api/client";
import { FaqResponse, SingleFaqResponse } from "./types";

export async function getFaqs(page: number = 1): Promise<FaqResponse> {
    return apiClient<FaqResponse>(`/api/faq?page=${page}`);
}

export async function getFaq(id: string): Promise<SingleFaqResponse> {
    return apiClient<SingleFaqResponse>(`/api/faq/${id}`);
}
