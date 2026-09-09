import { apiClient } from "@/lib/api/client";
import { ProfileResponse, UpdateProfilePayload } from "./types";

export const getProfile = () => apiClient<ProfileResponse>("/api/profile");

export const updateProfile = (data: FormData) => apiClient("/api/profile", { method: "POST", body: data });

export const changePassword = (data: import("./types").ChangePasswordPayload) => 
  apiClient("/api/change-password", { method: "POST", body: JSON.stringify(data) });
