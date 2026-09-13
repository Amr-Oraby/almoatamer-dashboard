import { apiClient } from "@/lib/api/client";
import { WithdrawalRequestsResponse } from "./types";

export async function getWithdrawalRequests(page: number = 1): Promise<WithdrawalRequestsResponse> {
    return apiClient<WithdrawalRequestsResponse>(`/api/withdrawl-requests?page=${page}`);
}

export async function updateWithdrawalRequest(id: number, status: 'confirmed' | 'rejected', status_confirmation: string) {
    const formData = new FormData();
    formData.append("status", status);
    formData.append("status_confirmation", status_confirmation);
    
    return apiClient(`/api/withdrawl-request/${id}`, {
        method: "POST",
        body: formData,
    });
}
