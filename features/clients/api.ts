import { apiClient } from "@/lib/api/client";
import { ClientsResponse, SingleClientResponse } from "./types";

export async function getClients(page: number = 1): Promise<ClientsResponse> {
    // Using the local API proxy which maps to the backend endpoint
    return apiClient<ClientsResponse>(`/api/clients?page=${page}`);
}

export async function getClient(id: string): Promise<SingleClientResponse> {
    return apiClient<SingleClientResponse>(`/api/client/${id}`);
}
