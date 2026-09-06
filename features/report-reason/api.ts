import { apiClient } from "@/lib/api/client";
import { ReportReasonsResponse, SingleReportReasonResponse } from "./types";

export async function getReportReasons(page: number = 1): Promise<ReportReasonsResponse> {
    return apiClient<ReportReasonsResponse>(`/api/report-reason?page=${page}`);
}

export async function getReportReason(id: string): Promise<SingleReportReasonResponse> {
    return apiClient<SingleReportReasonResponse>(`/api/report-reason/${id}`);
}
