import { apiClient } from "@/lib/api/client";
import { AboutResponse, SingleAboutResponse } from "./types";

export async function getAbouts(page: number = 1): Promise<AboutResponse> {
    return apiClient<AboutResponse>(`/api/about?page=${page}`);
}

export async function getAbout(id: string): Promise<SingleAboutResponse> {
    return apiClient<SingleAboutResponse>(`/api/about/3`);
}
