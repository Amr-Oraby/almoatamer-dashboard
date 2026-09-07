import { useQuery } from "@tanstack/react-query";
import { getWallets, getWallet } from "./api";

export function useWallets(page: number = 1, filters?: Record<string, string | null>) {
    return useQuery({
        queryKey: ["wallets", page, filters],
        queryFn: () => getWallets(page, filters),
    });
}

export function useWallet(id: string) {
    return useQuery({
        queryKey: ["wallet", id],
        queryFn: () => getWallet(id),
        enabled: !!id,
    });
}
