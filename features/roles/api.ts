import { apiClient } from "@/lib/api/client";
import { RolesResponse, SingleRoleResponse } from "./types";

export async function getRoles(page: number = 1): Promise<RolesResponse> {
    return apiClient<RolesResponse>(`/api/roles?page=${page}`);
}

export async function getRole(id: string): Promise<SingleRoleResponse> {
    return apiClient<SingleRoleResponse>(`/api/role/${id}`);
}
