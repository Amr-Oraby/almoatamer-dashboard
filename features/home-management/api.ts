import { apiClient } from "@/lib/api/client";
import { HomeInfoResponse, StatisticsResponse } from "@/features/home-management/types";

export const homeManagementApi = {
  getUmrahHomeInfo: () => {
    return apiClient<HomeInfoResponse>("/api/umrah-home-info");
  },
  getMoatmerHomeInfo: () => {
    return apiClient<HomeInfoResponse>("/api/moatmer-home-info");
  },
  getStatistics: () => {
    return apiClient<StatisticsResponse>("/api/statistics");
  }
};
