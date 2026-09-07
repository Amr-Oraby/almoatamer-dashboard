import { apiClient } from "@/lib/api/client";
import { UmrahsResponse, SingleUmrahResponse } from "./types";

export async function getUmrahs(page: number = 1, is_paid?: string | null): Promise<UmrahsResponse> {
  // Using the local API proxy which maps to the backend endpoint
  const url = new URLSearchParams()
  url.set("page", page.toString())
  if (is_paid) url.set("is_paid", is_paid)
    
  return apiClient<UmrahsResponse>(`/api/umrahs?${url.toString()}`);
}

export async function getUmrah(id: string): Promise<SingleUmrahResponse> {
  return apiClient<SingleUmrahResponse>(`/api/umrah/${id}`);
}

