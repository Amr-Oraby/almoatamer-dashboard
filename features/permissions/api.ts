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
  
  const deduplicatedResponse: AllPermissionsResponse = {};
  const seenNames = new Set<string>();

  for (const [module, perms] of Object.entries(response)) {
    const uniquePerms = [];
    for (const p of perms) {
      if (!seenNames.has(p.name)) {
        seenNames.add(p.name);
        uniquePerms.push(p);
      }
    }
    
    // Only add the module if it has at least one unique permission
    if (uniquePerms.length > 0) {
      deduplicatedResponse[module] = uniquePerms;
    }
  }
  
  return deduplicatedResponse;
};

