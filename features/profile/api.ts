import { apiClient } from "@/lib/api/client";
import { ProfileResponse, UpdateProfilePayload } from "./types";

export const getProfile = () => apiClient<ProfileResponse>("/api/profile");

export const updateProfile = (data: UpdateProfilePayload) => apiClient("/api/profile", { method: "POST", body: JSON.stringify(data) });
