import { apiClient } from "@/lib/api/client";
import { SettingsResponse } from "@/app/types/SettingType";

export const settingsApi = {
  getSettings: () => {
    return apiClient<SettingsResponse>("/api/settings");
  },
  updateSettings: (payload: Record<string, any>) => {
    return apiClient<{ status: string; message: string }>("/api/settings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
