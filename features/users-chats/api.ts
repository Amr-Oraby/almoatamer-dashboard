import { apiClient } from "@/lib/api/client";
import { UsersChatsResponse, SingleUserChatResponse } from "./types";

export async function getUsersChats(page: number = 1): Promise<UsersChatsResponse> {
    return apiClient<UsersChatsResponse>(`/api/users-chats?page=${page}`);
}

export async function getUsersChat(id: string): Promise<SingleUserChatResponse> {
    return apiClient<SingleUserChatResponse>(`/api/users-chats/${id}`);
}
