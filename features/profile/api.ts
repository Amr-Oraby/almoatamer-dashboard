import { apiClient } from "@/lib/api/client";


export const getProfile = () => apiClient("/api/profile");

export const updateProfile = (data: any) => apiClient("/api/profile", { method: "POST", body: JSON.stringify(data) });
