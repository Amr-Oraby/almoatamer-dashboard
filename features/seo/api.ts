import { apiClient } from "@/lib/api/client";
import { SeoResponse, SingleSeoResponse } from "./types";

export async function getSeos(page: number = 1, filters?: Record<string, string | null>): Promise<SeoResponse> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.append(key, value)
            }
        })
    }
    
    return apiClient<SeoResponse>(`/api/seo?${params.toString()}`);
}

export async function getSeo(id: string): Promise<SingleSeoResponse> {
    return apiClient<SingleSeoResponse>(`/api/seo/${id}`);
}

export async function deleteSeo(id: string): Promise<any> {
    return apiClient<any>(`/api/seo/${id}`, { method: 'DELETE' });
}

export async function toggleActivateSeo(id: string): Promise<any> {
    return apiClient<any>(`/api/seo/${id}`, { method: 'PUT', body: JSON.stringify({}) });
}
