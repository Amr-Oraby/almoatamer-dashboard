import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReferralLinks, getReferralLink, deleteReferralLink } from "./api";
import { toast } from "sonner";

export function useReferralLinks(page: number = 1) {
    return useQuery({
        queryKey: ["referral-links", page],
        queryFn: () => getReferralLinks(page),
    });
}

export function useReferralLink(id: string) {
    return useQuery({
        queryKey: ["referral-link", id],
        queryFn: () => getReferralLink(id),
        enabled: !!id,
    });
}

export function useDeleteReferralLink() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteReferralLink,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["referral-links"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}
