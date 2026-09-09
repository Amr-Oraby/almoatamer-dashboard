import { apiClient } from "@/lib/api/client";
import { ThankingWordsResponse, SingleThankingWordResponse, CreateThankingWordResponse } from "./types";
import { CreateThankingWordFormValues } from "./schemas";

export async function getThankingWords(page: number = 1): Promise<ThankingWordsResponse> {
    return apiClient<ThankingWordsResponse>(`/api/home-infos?page=${page}`);
}

export async function getThankingWord(id: string): Promise<SingleThankingWordResponse> {
    return apiClient<SingleThankingWordResponse>(`/api/home-info/${id}`);
}

export async function createThankingword(data: CreateThankingWordFormValues): Promise<CreateThankingWordResponse> {
    const formData = new FormData();
    formData.append("is_active", data.is_active ? "1" : "0");
    formData.append("name", data.name);
    formData.append("text", data.text);
    if (data.image) {
        formData.append("image", data.image);
    }
    
    return apiClient<CreateThankingWordResponse>('/api/create-home-info', {
        method: "POST",
        body: formData,
    });
}

export async function deleteThankingWord(id: number | string): Promise<{ status: string; message: string; data: null }> {
    return apiClient<{ status: string; message: string; data: null }>(`/api/home-info/${id}`, {
        method: "DELETE",
    });
}

export async function updateThankingWord(formData: FormData): Promise<any> {
    return apiClient<any>(`/api/update-home-info`, {
        method: "POST",
        body: formData,
    });
}
