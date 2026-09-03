import { apiClient } from "@/lib/api/client";
import { UmrahsResponse, SingleUmrahResponse } from "./types";

export async function getUmrahs(page: number = 1): Promise<UmrahsResponse> {
  // Using the local API proxy which maps to the backend endpoint
  return apiClient<UmrahsResponse>(`/api/umrahs?page=${page}`);
}

export async function getUmrah(id: string): Promise<SingleUmrahResponse> {
  return apiClient<SingleUmrahResponse>(`/api/umrah/${id}`);
}

