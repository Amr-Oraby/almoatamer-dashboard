import { apiClient } from "@/lib/api/client";
import { FinancialReportsResponse, FinancialReportsFineResponse } from "./types";

export async function getFinancialReports(): Promise<FinancialReportsResponse> {
    return apiClient<FinancialReportsResponse>("/api/financial-reports");
}

export async function getFinancialReportsFine(): Promise<FinancialReportsFineResponse> {
    return apiClient<FinancialReportsFineResponse>("/api/financial-reports-fine");
}
