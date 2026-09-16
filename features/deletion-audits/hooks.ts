import { useQuery } from "@tanstack/react-query";
import { getDeletionAudits, getDeletionAudit } from "./api";

export function useDeletionAudits(page: number = 1) {
    return useQuery({
        queryKey: ["deletion-audits", page],
        queryFn: () => getDeletionAudits(page),
    });
}

export function useDeletionAudit(id: number | string) {
    return useQuery({
        queryKey: ["deletion-audit", id],
        queryFn: () => getDeletionAudit(id),
        enabled: !!id,
    });
}
