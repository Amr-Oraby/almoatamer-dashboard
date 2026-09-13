import { apiClient } from "@/lib/api/client";
import { PermissionsResponse, MyPermissionsResponse, AllPermissionsResponse } from "./types";

export const getPermissions = async (page: number = 1): Promise<PermissionsResponse> => {
  return apiClient<PermissionsResponse>(`/api/permissions?page=${page}`);
};

export const getMyPermissions = async (): Promise<MyPermissionsResponse> => {
  return apiClient<MyPermissionsResponse>("/api/get_my_permissions");
};

export const getAllPermissions = async (): Promise<AllPermissionsResponse> => {
  const response = await apiClient<AllPermissionsResponse>("/api/permissions/list");
  
  // Deduplicate permissions in each module by their ID
  const deduplicatedResponse: AllPermissionsResponse = {};
  for (const [module, perms] of Object.entries(response)) {
    // Also deduplicate by name just in case the backend returns different IDs for the exact same permission name
    // We'll use name as the primary deduplication key to be safe, but fallback to id if needed
    const uniquePerms = Array.from(new Map(perms.map(p => [p.name, p])).values());
    deduplicatedResponse[module] = uniquePerms;
  }
  
  return deduplicatedResponse;
};

