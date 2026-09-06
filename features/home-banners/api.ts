import { apiClient } from "@/lib/api/client";
import { HomeBannersResponse, SingleHomeBannerResponse } from "./types";

export async function getHomeBanners(page: number = 1): Promise<HomeBannersResponse> {
    return apiClient<HomeBannersResponse>(`/api/home-banners?page=${page}`);
}

export async function getHomeBanner(id: string): Promise<SingleHomeBannerResponse> {
    return apiClient<SingleHomeBannerResponse>(`/api/home-banner/${id}`);
}
