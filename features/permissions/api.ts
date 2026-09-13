import { apiClient } from "@/lib/api/client";
import { PermissionsResponse, MyPermissionsResponse, AllPermissionsResponse } from "./types";

export const getPermissions = async (page: number = 1): Promise<PermissionsResponse> => {
  return apiClient<PermissionsResponse>(`/api/permissions?page=${page}`);
};

export const getMyPermissions = async (): Promise<MyPermissionsResponse> => {
  return apiClient<MyPermissionsResponse>("/api/get_my_permissions");
};

export const getAllPermissions = async (): Promise<AllPermissionsResponse> => {
  return apiClient<AllPermissionsResponse>("/api/permissions/list");
};

