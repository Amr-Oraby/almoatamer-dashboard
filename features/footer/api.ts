import { apiClient } from "@/lib/api/client";
import { FooterResponse } from "./types";

export const getFooterInfo = () => {
  return apiClient<FooterResponse>("/api/umrah-footer-info");
};

export const updateFooterInfo = (data: FormData) => {
  return apiClient<any>("/api/update-umrah-home", {
    method: "POST",
    body: data,
  });
};
