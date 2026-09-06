import { apiClient } from "@/lib/api/client";
import { LanguagesResponse, SingleLanguageResponse } from "./types";

export async function getLanguages(page: number = 1): Promise<LanguagesResponse> {
    return apiClient<LanguagesResponse>(`/api/languages?page=${page}`);
}

export async function getLanguage(id: string): Promise<SingleLanguageResponse> {
    return apiClient<SingleLanguageResponse>(`/api/languages/${id}`);
}
