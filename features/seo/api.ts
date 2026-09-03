import { apiClient } from "@/lib/api/client";
import { SeoResponse } from "@/app/types/SeoType";

export const seoApi = {
  getSeoData: (page: number = 1) => {
    return apiClient<SeoResponse>(`/api/seo?page=${page}`);
  }
};
