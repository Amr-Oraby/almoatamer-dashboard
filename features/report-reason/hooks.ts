import { useQuery } from "@tanstack/react-query";
import { getReportReasons, getReportReason } from "./api";

export function useReportReasons(page: number = 1) {
    return useQuery({
        queryKey: ["report-reasons", page],
        queryFn: () => getReportReasons(page),
    });
}

export function useReportReason(id: string) {
    return useQuery({
        queryKey: ["report-reason", id],
        queryFn: () => getReportReason(id),
        enabled: !!id,
    });
}
