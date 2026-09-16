import { useQuery } from "@tanstack/react-query";
import { getFinancialReports, getFinancialReportsFine } from "./api";

export function useFinancialReports() {
    return useQuery({
        queryKey: ["financial-reports"],
        queryFn: () => getFinancialReports(),
    });
}

export function useFinancialReportsFine() {
    return useQuery({
        queryKey: ["financial-reports-fine"],
        queryFn: () => getFinancialReportsFine(),
    });
}
