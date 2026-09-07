import { apiClient } from "@/lib/api/client";
import { LanguagesResponse, SingleLanguageResponse } from "./types";

export async function getLanguages(page: number = 1): Promise<LanguagesResponse> {
    return apiClient<LanguagesResponse>(`/api/languages?page=${page}`);
}

export async function getLanguage(id: string): Promise<SingleLanguageResponse> {
    return apiClient<SingleLanguageResponse>(`/api/language/${id}`);
}

export async function deleteLanguage(id: string): Promise<any> {
    return apiClient<any>(`/api/language/${id}`, { method: 'DELETE' });
}
