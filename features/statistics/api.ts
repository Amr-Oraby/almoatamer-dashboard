import { apiClient } from "@/lib/api/client";
import { StatisticsResponse, StatisticsUpdateResponse, StatisticsUpdateRequest } from "./types";

export async function getStatistics(): Promise<StatisticsResponse> {
    return apiClient<StatisticsResponse>("/api/statistics");
}

export async function updateStatistics(data: StatisticsUpdateRequest): Promise<StatisticsUpdateResponse> {
    return apiClient<StatisticsUpdateResponse>("/api/statistics", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
