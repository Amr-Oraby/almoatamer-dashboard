import { apiClient } from "@/lib/api/client";
import { DeletionAuditsResponse, SingleDeletionAuditResponse } from "./types";

export async function getDeletionAudits(page: number = 1): Promise<DeletionAuditsResponse> {
    return apiClient<DeletionAuditsResponse>(`/api/deletion-audits?page=${page}`);
}

export async function getDeletionAudit(id: number | string): Promise<SingleDeletionAuditResponse> {
    return apiClient<SingleDeletionAuditResponse>(`/api/deletion-audits/${id}`);
}
