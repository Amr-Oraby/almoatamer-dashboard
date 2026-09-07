import { apiClient } from "@/lib/api/client";
import { ClientsResponse, SingleClientResponse } from "./types";

export async function getClients(page: number = 1, filters?: Record<string, string | null>): Promise<ClientsResponse> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.append(key, value)
            }
        })
    }
    
    // Using the local API proxy which maps to the backend endpoint
    return apiClient<ClientsResponse>(`/api/clients?${params.toString()}`);
}
export async function getClientsWithoutPagination(): Promise<any> {
    // Using the local API proxy which maps to the backend endpoint
    return apiClient<any>(`/api/clients-without-pagination`);
}

export async function getClient(id: string): Promise<SingleClientResponse> {
    return apiClient<SingleClientResponse>(`/api/client/${id}`);
}
