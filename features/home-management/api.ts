import { apiClient } from "@/lib/api/client";
import { HomeInfoResponse, StatisticsResponse } from "@/app/types/HomeManagementType";

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
