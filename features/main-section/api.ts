import { apiClient } from "@/lib/api/client";
import { MainSectionResponse } from "./types";

export const getMainSectionInfo = () => {
  return apiClient<MainSectionResponse>("/api/umrah-home-info");
};

export const updateMainSectionInfo = (data: FormData) => {
  return apiClient<any>("/api/update-umrah-home", {
    method: "POST",
    body: data,
  });
};
