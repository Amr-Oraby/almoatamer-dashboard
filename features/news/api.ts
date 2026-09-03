import { apiClient } from "@/lib/api/client";
import { NewsResponse } from "@/app/types/NewsType";

export const newsApi = {
  getNews: (page: number = 1) => {
    return apiClient<NewsResponse>(`/api/news?page=${page}`);
  },
  deleteNews: (id: number) => {
    return apiClient<any>(`/api/news/${id}`, {
      method: "DELETE",
    });
  }
};
