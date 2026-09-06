import { apiClient } from "@/lib/api/client";
import { NotificationsResponse } from "./types";

export async function getNotifications(page: number = 1): Promise<NotificationsResponse> {
    return apiClient<NotificationsResponse>(`/api/show-notifications?page=${page}`);
}
