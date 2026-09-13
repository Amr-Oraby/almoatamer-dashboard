import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWallets, getWallet, chargeWallet } from "./api";
import { toast } from "sonner";

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

export function useChargeWallet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: chargeWallet,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم شحن المحفظة بنجاح");
            queryClient.invalidateQueries({ queryKey: ["wallets"] });
            queryClient.invalidateQueries({ queryKey: ["wallet"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء شحن المحفظة");
        },
    });
}
