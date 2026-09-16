import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPeriodHistories, deletePeriodHistory } from "./api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function usePeriodHistories(page: number = 1) {
    return useQuery({
        queryKey: ["period-histories", page],
        queryFn: () => getPeriodHistories(page),
    });
}

export function useDeletePeriodHistory() {
    const queryClient = useQueryClient();
    const t = useTranslations("Dashboard");

    return useMutation({
        mutationFn: (id: number | string) => deletePeriodHistory(id),
        onSuccess: () => {
            toast.success(t("deleted_successfully", { fallback: "Deleted successfully" }));
            queryClient.invalidateQueries({ queryKey: ["period-histories"] });
        },
        onError: () => {
            toast.error(t("error_occurred", { fallback: "An error occurred" }));
        }
    });
}
