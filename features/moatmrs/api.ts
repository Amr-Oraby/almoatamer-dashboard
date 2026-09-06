import { apiClient } from "@/lib/api/client";
import { MoatmrsResponse, SingleMoatmrResponse } from "./types";

export async function getMoatmrs(page: number = 1): Promise<MoatmrsResponse> {
    return apiClient<MoatmrsResponse>(`/api/moatmrs?page=${page}`);
}

export async function getMoatmr(id: string): Promise<SingleMoatmrResponse> {
    return apiClient<SingleMoatmrResponse>(`/api/moatmr/${id}`);
}
