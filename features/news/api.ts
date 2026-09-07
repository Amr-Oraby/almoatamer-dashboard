import { apiClient } from "@/lib/api/client";
import { NewsResponse, SingleNewsResponse } from "./types";

export async function getNewsList(page: number = 1): Promise<NewsResponse> {
    return apiClient<NewsResponse>(`/api/news?page=${page}`);
}

export async function getNewsItem(id: string): Promise<SingleNewsResponse> {
    return apiClient<SingleNewsResponse>(`/api/news/${id}`);
}

export async function deleteNews(id: string): Promise<any> {
    return apiClient<any>(`/api/news/${id}`, { method: 'DELETE' });
}
