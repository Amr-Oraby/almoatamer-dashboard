import { apiClient } from "@/lib/api/client";
import { AdminsResponse, SingleAdminResponse } from "./types";

export async function getAdmins(page: number = 1, filters?: Record<string, string | null>): Promise<AdminsResponse> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                // The API for admins expects 'keyword' as is
                params.append(key, value)
            }
        })
    }
    
    return apiClient<AdminsResponse>(`/api/admins?${params.toString()}`);
}

export async function getAdmin(id: string): Promise<SingleAdminResponse> {
    return apiClient<SingleAdminResponse>(`/api/admins/${id}`);
}

export async function deleteAdmin(id: string): Promise<any> {
    return apiClient<any>(`/api/admins/${id}`, { method: 'DELETE' });
}

export async function createAdmin(formData: FormData): Promise<any> {
    return apiClient<any>('/api/admins', {
        method: 'POST',
        body: formData,
    });
}

export async function updateAdmin(id: string, formData: FormData): Promise<any> {
    return apiClient<any>(`/api/update-admin/${id}`, {
        method: 'POST',
        body: formData,
    });
}
