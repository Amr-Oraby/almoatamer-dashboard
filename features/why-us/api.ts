import { apiClient } from "@/lib/api/client";
import { WhyUsResponse, SingleWhyUsResponse } from "./types";

export async function getWhyUsItems(page: number = 1): Promise<WhyUsResponse> {
    return apiClient<WhyUsResponse>(`/api/why-us?page=${page}`);
}

export async function getWhyUsItem(id: string): Promise<SingleWhyUsResponse> {
    return apiClient<SingleWhyUsResponse>(`/api/why-us/${id}`);
}
