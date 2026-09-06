import { apiClient } from "@/lib/api/client";
import { WithdrawalRequestsResponse } from "./types";

export async function getWithdrawalRequests(page: number = 1): Promise<WithdrawalRequestsResponse> {
    return apiClient<WithdrawalRequestsResponse>(`/api/withdrawl-requests?page=${page}`);
}
