import { apiClient } from "@/lib/api/client";
import { WhoIsAlmuatamerResponse } from "./types";

export const getWhoIsAlmuatamerInfo = () => {
  return apiClient<WhoIsAlmuatamerResponse>("/api/moatmer-home-info");
};

export const updateWhoIsAlmuatamerInfo = (data: FormData) => {
  return apiClient<any>("/api/update-umrah-home", {
    method: "POST",
    body: data,
  });
};
