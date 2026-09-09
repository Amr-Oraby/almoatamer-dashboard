import { apiClient } from "@/lib/api/client";
import { ReportReasonsResponse, SingleReportReasonResponse } from "./types";

export async function getReportReasons(page: number = 1): Promise<ReportReasonsResponse> {
    return apiClient<ReportReasonsResponse>(`/api/report-reason?page=${page}`);
}

export async function getReportReason(id: string): Promise<SingleReportReasonResponse> {
    return apiClient<SingleReportReasonResponse>(`/api/report-reason/${id}`);
}

export async function deleteReportReason(id: string): Promise<any> {
    return apiClient<any>(`/api/report-reason/${id}`, { method: 'DELETE' });
}

export async function createReportReason(formData: FormData): Promise<any> {
    return apiClient<any>(`/api/create-report-reason`, {
        method: "POST",
        body: formData,
    });
}

export async function updateReportReason(formData: FormData): Promise<any> {
    return apiClient<any>(`/api/update-report-reason`, {
        method: "POST",
        body: formData,
    });
}
