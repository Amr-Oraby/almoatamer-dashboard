import { useQuery } from "@tanstack/react-query";
import { getReferralLinks, getReferralLink } from "./api";

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
