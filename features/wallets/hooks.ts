import { useQuery } from "@tanstack/react-query";
import { getWallets, getWallet } from "./api";

export function useWallets(page: number = 1) {
    return useQuery({
        queryKey: ["wallets", page],
        queryFn: () => getWallets(page),
    });
}

export function useWallet(id: string) {
    return useQuery({
        queryKey: ["wallet", id],
        queryFn: () => getWallet(id),
        enabled: !!id,
    });
}
