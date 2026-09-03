import { apiClient } from "@/lib/api/client";
import { WithdrawalsResponse } from "@/app/types/WithdrawalType";

export async function getWithdrawals(page: number = 1): Promise<WithdrawalsResponse> {
  const url = `/api/withdrawl-requests?page=${page}`;
  return apiClient<WithdrawalsResponse>(url);
}
