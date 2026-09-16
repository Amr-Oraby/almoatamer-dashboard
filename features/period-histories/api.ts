import { apiClient } from "@/lib/api/client";
import { PeriodHistoriesResponse } from "./types";

export async function getPeriodHistories(page: number = 1): Promise<PeriodHistoriesResponse> {
    return apiClient<PeriodHistoriesResponse>(`/api/period-histories?page=${page}`);
}

export async function deletePeriodHistory(id: number | string): Promise<any> {
    return apiClient<any>(`/api/period-histories/${id}`, { method: 'DELETE' });
}
