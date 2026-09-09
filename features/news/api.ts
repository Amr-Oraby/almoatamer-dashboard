import { apiClient } from "@/lib/api/client";
import { NewsResponse, SingleNewsResponse } from "./types";

export async function getNewsList(page: number = 1, filters?: Record<string, string | null>): Promise<NewsResponse> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                // The URL uses 'keyword', but the backend API expects 'search'
                const apiKey = key === 'keyword' ? 'search' : key;
                params.append(apiKey, value)
            }
        })
    }
    
    return apiClient<NewsResponse>(`/api/news?${params.toString()}`);
}

export async function getNewsItem(id: string): Promise<SingleNewsResponse> {
    return apiClient<SingleNewsResponse>(`/api/news/${id}`);
}

export async function deleteNews(id: string): Promise<any> {
    return apiClient<any>(`/api/news/${id}`, { method: 'DELETE' });
}

export async function createNews(data: FormData): Promise<SingleNewsResponse> {
    return apiClient<SingleNewsResponse>('/api/news', {
        method: 'POST',
        body: data,
    });
}

export async function updateNews(id: string, data: FormData): Promise<any> {
    return apiClient<any>(`/api/update-news/${id}`, {
        method: 'POST',
        body: data,
    });
}
