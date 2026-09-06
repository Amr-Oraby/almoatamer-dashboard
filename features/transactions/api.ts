import { apiClient } from "@/lib/api/client";
import { TransactionsResponse, SingleTransactionResponse } from "./types";

export async function getTransactions(page: number = 1): Promise<TransactionsResponse> {
    return apiClient<TransactionsResponse>(`/api/all-transactions?page=${page}`);
}

export async function getTransaction(id: string): Promise<SingleTransactionResponse> {
    return apiClient<SingleTransactionResponse>(`/api/transaction/${id}`);
}
