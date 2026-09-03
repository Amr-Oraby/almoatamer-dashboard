import { apiClient } from "@/lib/api/client";
import { TransactionsResponse, TransactionItem } from "@/app/types/TransactionType";

export async function getTransactions(page: number = 1): Promise<TransactionsResponse> {
  // Use server route proxy for transactions
  const url = `/api/all-transactions?page=${page}`;
  return apiClient<TransactionsResponse>(url);
}

export async function getTransaction(id: string) {
  return apiClient<{ data: TransactionItem; status: string; message: string }>(`/api/transaction/${id}`);
}
