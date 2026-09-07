import { apiClient } from "@/lib/api/client";
import { SeoResponse, SingleSeoResponse } from "./types";

export async function getSeos(page: number = 1): Promise<SeoResponse> {
    return apiClient<SeoResponse>(`/api/seo?page=${page}`);
}

export async function getSeo(id: string): Promise<SingleSeoResponse> {
    return apiClient<SingleSeoResponse>(`/api/seo/${id}`);
}

export async function deleteSeo(id: string): Promise<any> {
    return apiClient<any>(`/api/seo/${id}`, { method: 'DELETE' });
}
