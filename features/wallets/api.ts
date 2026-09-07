import { apiClient } from "@/lib/api/client";
import { WalletsResponse, SingleWalletResponse } from "./types";

export async function getWallets(page: number = 1, filters?: Record<string, string | null>): Promise<WalletsResponse> {
    const params = new URLSearchParams()
    params.append('page', page.toString())

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.append(key, value)
            }
        })
    }

    return apiClient<WalletsResponse>(`/api/wallets?${params.toString()}`);
}

export async function getWallet(id: string): Promise<SingleWalletResponse> {
    return apiClient<SingleWalletResponse>(`/api/wallet/${id}`);
}
