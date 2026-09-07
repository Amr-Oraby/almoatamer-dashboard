import { apiClient } from "@/lib/api/client";
import { SettingsResponse, SettingUpdateResponse, SettingUpdateRequest } from "./types";

export async function getSettings(): Promise<SettingsResponse> {
    return apiClient<SettingsResponse>("/api/settings");
}

export async function updateSetting(data: Record<string, string | number>): Promise<SettingUpdateResponse> {
    // Note: The endpoint is called "create-setting" to update a setting. 
    // This is a mistake from the backend, but we are following their contract.
    return apiClient<SettingUpdateResponse>("/api/create-setting", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function deleteSetting(id: number): Promise<any> {
    return apiClient<any>(`/api/setting/${id}`, { method: 'DELETE' });
}
