import { apiClient } from "@/lib/api/client";
import { ThankingWordsResponse, SingleThankingWordResponse } from "./types";

export async function getThankingWords(page: number = 1): Promise<ThankingWordsResponse> {
    return apiClient<ThankingWordsResponse>(`/api/home-infos?page=${page}`);
}

export async function getThankingWord(id: string): Promise<SingleThankingWordResponse> {
    return apiClient<SingleThankingWordResponse>(`/api/home-info/${id}`);
}
