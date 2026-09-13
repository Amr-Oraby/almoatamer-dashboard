import { apiClient } from "@/lib/api/client";
import { MoatmrsResponse, SingleMoatmrResponse } from "./types";

export async function getMoatmrs(page: number = 1, filters?: Record<string, string | null>): Promise<MoatmrsResponse> {
    const params = new URLSearchParams()
    params.append('page', page.toString())

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.append(key, value)
            }
        })
    }

    return apiClient<MoatmrsResponse>(`/api/moatmrs?${params.toString()}`);
}
export async function getMoatmrsWithoutPagination(): Promise<any> {
    return apiClient<any>(`/api/moatmrs-without-pagination`);
}

export async function getMoatmr(id: string): Promise<SingleMoatmrResponse> {
    return apiClient<SingleMoatmrResponse>(`/api/moatmr/${id}`);
}

export async function deleteMoatmr(id: string): Promise<any> {
    return apiClient<any>(`/api/delete_moatmr/${id}`, { method: 'DELETE' });
}

export async function toggleAcceptMoatmr(id: string): Promise<any> {
    return apiClient<any>(`/api/accept-moatmer/${id}`, { method: 'POST', body: JSON.stringify({}) });
}

export async function createMoatmr(data: FormData): Promise<any> {
    return apiClient<any>('/api/add_moatmr', {
        method: 'POST',
        body: data,
    });
}

export async function updateMoatmr(id: string, data: FormData): Promise<any> {
    return apiClient<any>(`/api/update_moatmr/${id}`, {
        method: 'POST',
        body: data,
    });
}
