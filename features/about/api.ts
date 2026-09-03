import { apiClient } from "@/lib/api/client";
import { AboutResponse } from "@/app/types/AboutType";

export const aboutApi = {
  getAboutData: (page: number = 1) => {
    return apiClient<AboutResponse>(`/api/about?page=${page}`);
  },
  updateAbout: (formData: FormData) => {
    return apiClient<any>("/api/update-about", {
      method: "POST",
      body: formData,
    });
  }
};
