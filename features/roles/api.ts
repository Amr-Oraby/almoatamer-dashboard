import { apiClient } from "@/lib/api/client";
import { RolesResponse, SingleRoleResponse } from "./types";

export async function getRoles(page: number = 1): Promise<RolesResponse> {
    return apiClient<RolesResponse>(`/api/roles?page=${page}`);
}

export async function createRole(data: any): Promise<any> {
    return apiClient<any>('/api/roles', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getRole(id: string): Promise<SingleRoleResponse> {
    return apiClient<SingleRoleResponse>(`/api/roles/${id}`);
}

export async function deleteRole(id: string): Promise<any> {
    return apiClient<any>(`/api/roles/${id}`, { method: 'DELETE' });
}

export async function updateRole(id: string, data: any): Promise<any> {
    return apiClient<any>(`/api/roles/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

export async function toggleRoleStatus({ id, is_active }: { id: string, is_active: number | boolean }): Promise<any> {
    return apiClient<any>(`/api/roles/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ is_active })
    });
}
