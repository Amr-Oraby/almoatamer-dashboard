import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStatistics, updateStatistics } from "./api";
import { toast } from "sonner";
import { StatisticsUpdateRequest } from "./types";
import { useTranslations } from "next-intl";

export const statisticsKeys = {
    all: ["statistics"] as const,
};

export function useStatistics() {
    return useQuery({
        queryKey: statisticsKeys.all,
        queryFn: getStatistics,
    });
}

export function useUpdateStatistics() {
    const queryClient = useQueryClient();
    const t = useTranslations();

    return useMutation({
        mutationFn: (data: StatisticsUpdateRequest) => updateStatistics(data),
        onSuccess: (response) => {
            toast.success(response.message || t("success_update_message", { fallback: "تم التعديل بنجاح" }));
            queryClient.invalidateQueries({ queryKey: statisticsKeys.all });
        },
        onError: (error: any) => {
            toast.error(error.message || t("error_update_message", { fallback: "حدث خطأ أثناء التعديل" }));
        },
    });
}
