import { apiClient } from "@/lib/api/client";
import { ClientMessagesResponse, SingleClientMessageResponse } from "./types";

export async function getClientMessages(page: number = 1): Promise<ClientMessagesResponse> {
    return apiClient<ClientMessagesResponse>(`/api/client-messages?page=${page}`);
}

export async function getClientMessage(id: string): Promise<SingleClientMessageResponse> {
    return apiClient<SingleClientMessageResponse>(`/api/client-message/${id}`);
}
