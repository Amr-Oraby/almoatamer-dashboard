import { apiClient } from "@/lib/api/client";
import { DashboardResponse } from "./types";

export const getDashboardStats = () => 
  apiClient<DashboardResponse>("/api/dashboard");
