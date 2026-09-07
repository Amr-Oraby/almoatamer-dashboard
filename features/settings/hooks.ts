import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSetting, deleteSetting } from "./api";
import { toast } from "sonner";
import { SettingUpdateRequest } from "./types";
import { useTranslations } from "next-intl";

export const settingsKeys = {
    all: ["settings"] as const,
};

export function useSettings() {
    return useQuery({
        queryKey: settingsKeys.all,
        queryFn: getSettings,
    });
}

export function useUpdateSetting() {
    const queryClient = useQueryClient();
    const t = useTranslations("Settings");

    return useMutation({
        mutationFn: (data: Record<string, string | number>) => updateSetting(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: settingsKeys.all });
        },
        onError: (error: any) => {
            toast.error(error.message || t("error_update_message", { fallback: "An error occurred during update" }));
        },
    });
}

export function useDeleteSetting() {
    const queryClient = useQueryClient();
    const t = useTranslations("Settings");

    return useMutation({
        mutationFn: (id: number) => deleteSetting(id),
        onSuccess: (response) => {
            toast.success(response?.message || t("success_delete_message", { fallback: "Deleted successfully" }));
            queryClient.invalidateQueries({ queryKey: settingsKeys.all });
        },
        onError: (error: any) => {
            toast.error(error.message || t("error_delete_message", { fallback: "An error occurred during deletion" }));
        },
    });
}
