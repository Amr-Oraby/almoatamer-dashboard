import { useQuery } from "@tanstack/react-query";
import { getTransactions, getTransaction } from "./api";
import { TransactionsResponse } from "@/app/types/TransactionType";

interface UseTransactionsOptions {
  page?: number;
}

export function useTransactions({ page = 1 }: UseTransactionsOptions = {}) {
  return useQuery<TransactionsResponse>({
    queryKey: ["transactions", { page }],
    queryFn: () => getTransactions(page),
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransaction(id).then((res) => res.data),
    enabled: !!id,
  });
}
