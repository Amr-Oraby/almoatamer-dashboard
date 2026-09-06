import { apiClient } from "@/lib/api/client";
import { WithdrawalRequestsResponse, SingleWithdrawalRequestResponse } from "./types";

export async function getWithdrawalRequests(page: number = 1): Promise<WithdrawalRequestsResponse> {
    return apiClient<WithdrawalRequestsResponse>(`/api/withdrawl-requests?page=${page}`);
}

export async function getWithdrawalRequest(id: string): Promise<SingleWithdrawalRequestResponse> {
    return apiClient<SingleWithdrawalRequestResponse>(`/api/withdrawl-requests/${id}`);
}
