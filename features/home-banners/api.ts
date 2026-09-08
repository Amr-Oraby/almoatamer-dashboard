import { apiClient } from "@/lib/api/client";
import { HomeBannersResponse, SingleHomeBannerResponse } from "./types";
import { CreateHomeBannerFormValues } from "./schemas";

export async function getHomeBanners(page: number = 1): Promise<HomeBannersResponse> {
    return apiClient<HomeBannersResponse>(`/api/home-banners?page=${page}`);
}

export async function getHomeBanner(id: string): Promise<SingleHomeBannerResponse> {
    return apiClient<SingleHomeBannerResponse>(`/api/home-banner/${id}`);
}

export async function deleteHomeBanner(id: string): Promise<any> {
    return apiClient<any>(`/api/home-banner/${id}`, { method: 'DELETE' });
}

export async function createHomeBanner(data: CreateHomeBannerFormValues): Promise<any> {
    const formData = new FormData();
    formData.append("is_active", data.is_active ? "1" : "0");
    if (data.images && data.images.length > 0) {
        data.images.forEach((image: File, index: number) => {
            formData.append(`images[${index}]`, image);
        });
    }
    
    return apiClient<any>('/api/create-home-banner', {
        method: "POST",
        body: formData,
    });
}
