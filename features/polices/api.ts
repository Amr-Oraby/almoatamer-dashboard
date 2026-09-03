import { apiClient } from "@/lib/api/client";
import { PoliciesResponse } from "@/app/types/PoliciesType";

export const policiesApi = {
  getPoliciesData: (page: number = 1) => {
    return apiClient<PoliciesResponse>(`/api/policies?page=${page}`);
  },
  updatePolicy: (formData: FormData) => {
    return apiClient<any>("/api/update-policy", {
      method: "POST",
      body: formData,
    });
  }
};
