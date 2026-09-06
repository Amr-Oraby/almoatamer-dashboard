import { apiClient } from "@/lib/api/client";
import { TermsResponse, SingleTermResponse } from "./types";

export async function getTerms(page: number = 1): Promise<TermsResponse> {
    return apiClient<TermsResponse>(`/api/terms?page=${page}`);
}

export async function getTerm(id: string): Promise<SingleTermResponse> {
    return apiClient<SingleTermResponse>(`/api/terms/2`);
}
