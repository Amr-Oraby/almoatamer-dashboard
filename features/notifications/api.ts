import { apiClient } from "@/lib/api/client";
import { NotificationsResponse } from "./types";

export async function getNotifications(page: number = 1): Promise<NotificationsResponse> {
    return apiClient<NotificationsResponse>(`/api/show-notifications?page=${page}`);
}

export async function deleteNotification(id: string): Promise<any> {
    return apiClient<any>(`/api/delete-notification/${id}`, { method: 'DELETE' });
}
