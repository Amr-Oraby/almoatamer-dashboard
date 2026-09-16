import { apiClient } from "@/lib/api/client";
import { GetConversationsResponse, GetChatResponse } from "./types";

export async function getConversations(): Promise<GetConversationsResponse> {
    return apiClient<GetConversationsResponse>(`/api/get-conversations`);
}

export async function getChat(chatId: string | number): Promise<GetChatResponse> {
    return apiClient<GetChatResponse>(`/api/chat?chat_id=${chatId}`);
}

export async function sendMessage(formData: FormData): Promise<{ status: string; message: string; }> {
    return apiClient<{ status: string; message: string; }>(`/api/send-message`, {
        method: 'POST',
        body: formData,
    });
}
