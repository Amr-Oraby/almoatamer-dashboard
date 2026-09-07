import { apiClient } from "@/lib/api/client";
import { HowToStartResponse } from "./types";

export async function getHowToStart(): Promise<HowToStartResponse> {
    return apiClient<HowToStartResponse>(`/api/how-to-start`);
}

export async function updateHowToStart(formData: FormData): Promise<any> {
    return apiClient<any>(`/api/how-to-start`, {
        method: "POST",
        body: formData,
    });
}
