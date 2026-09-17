import { apiClient } from "@/lib/api/client";
import { UmrahsResponse, SingleUmrahResponse, UmrahMoatmersResponse } from "./types";

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

export async function getUmrahMoatmers(id: string, page: number = 1): Promise<UmrahMoatmersResponse> {
  return apiClient<UmrahMoatmersResponse>(`/api/umrah/${id}/moatmers?page=${page}`);
}

export async function setMoatmerToUmrah(umrahId: string, moatmerId: string): Promise<{status: string | number, message: string}> {
  return apiClient<{status: string | number, message: string}>(`/api/set-moatmer-to-umrah/${umrahId}/${moatmerId}`, {
    method: "POST",
  });
}

export async function updateStatusAndNotify(umrahId: string): Promise<{status: string | number, message: string}> {
  return apiClient<{status: string | number, message: string}>(`/api/update-status-and-notify/${umrahId}`, {
    method: "POST",
  });
}
