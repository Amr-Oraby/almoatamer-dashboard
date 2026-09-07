import { apiClient } from "@/lib/api/client";
import { AdminsResponse, SingleAdminResponse } from "./types";

export async function getAdmins(page: number = 1): Promise<AdminsResponse> {
    return apiClient<AdminsResponse>(`/api/admins?page=${page}`);
}

export async function getAdmin(id: string): Promise<SingleAdminResponse> {
    return apiClient<SingleAdminResponse>(`/api/admins/${id}`);
}

export async function deleteAdmin(id: string): Promise<any> {
    return apiClient<any>(`/api/admins/${id}`, { method: 'DELETE' });
}
