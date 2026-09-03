import { useQuery } from "@tanstack/react-query";
import { getWithdrawals } from "./api";
import { WithdrawalsResponse } from "@/app/types/WithdrawalType";

interface UseWithdrawalsOptions {
  page?: number;
}

export function useWithdrawals({ page = 1 }: UseWithdrawalsOptions = {}) {
  return useQuery<WithdrawalsResponse>({
    queryKey: ["withdrawals", { page }],
    queryFn: () => getWithdrawals(page),
  });
}
