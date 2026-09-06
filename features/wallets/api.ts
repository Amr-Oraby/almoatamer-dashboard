import { apiClient } from "@/lib/api/client";
import { WalletsResponse, SingleWalletResponse } from "./types";

export async function getWallets(page: number = 1): Promise<WalletsResponse> {
    return apiClient<WalletsResponse>(`/api/wallets?page=${page}`);
}

export async function getWallet(id: string): Promise<SingleWalletResponse> {
    return apiClient<SingleWalletResponse>(`/api/wallets/${id}`);
}
