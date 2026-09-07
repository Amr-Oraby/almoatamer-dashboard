import { apiClient } from "@/lib/api/client";
import { UmrahsResponse, SingleUmrahResponse } from "./types";

export async function getUmrahs(page: number = 1, filters: Record<string, string | null | undefined> = {}): Promise<UmrahsResponse> {
  // Using the local API proxy which maps to the backend endpoint
  const url = new URLSearchParams()
  url.set("page", page.toString())
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value) url.set(key, value)
  })
    
  return apiClient<UmrahsResponse>(`/api/umrahs?${url.toString()}`);
}

export async function getUmrah(id: string): Promise<SingleUmrahResponse> {
  return apiClient<SingleUmrahResponse>(`/api/umrah/${id}`);
}

