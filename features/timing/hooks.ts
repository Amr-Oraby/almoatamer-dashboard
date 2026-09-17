import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTimings, bulkUpdateTimingDays, toggleTimingDay, updateTimingDay, addTimingDay } from "./api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useTimings = () => {
    return useQuery({
        queryKey: ["timings"],
        queryFn: getTimings,
    });
};

export const useBulkUpdateTimingDays = () => {
    const queryClient = useQueryClient();
    const t = useTranslations("Timing");
    
    return useMutation({
        mutationFn: bulkUpdateTimingDays,
        onSuccess: (res) => {
            if (res?.status === "success" || res?.status === true) {
                toast.success(res?.message || t("update_success") || "Updated successfully");
            } else {
                toast.success(t("update_success") || "Updated successfully");
            }
            queryClient.invalidateQueries({ queryKey: ["timings"] });
        },
        onError: () => {
            toast.error(t("update_error") || "Error updating");
        }
    });
};

export const useToggleTimingDay = () => {
    const queryClient = useQueryClient();
    const t = useTranslations("Timing");
    
    return useMutation({
        mutationFn: toggleTimingDay,
        onSuccess: (res) => {
            if (res?.status === "success" || res?.status === true) {
                toast.success(res?.message || t("toggle_success") || "Toggled successfully");
            } else {
                toast.success(t("toggle_success") || "Toggled successfully");
            }
            queryClient.invalidateQueries({ queryKey: ["timings"] });
        },
        onError: () => {
            toast.error(t("toggle_error") || "Error toggling");
        }
    });
};

export const useUpdateTimingDay = (dayId: number) => {
    const queryClient = useQueryClient();
    const t = useTranslations("Timing");
    
    return useMutation({
        mutationFn: (data: FormData) => updateTimingDay(dayId, data),
        onSuccess: (res) => {
            if (res?.status === "success" || res?.status === true) {
                toast.success(res?.message || t("update_success") || "Updated successfully");
            } else {
                toast.success(t("update_success") || "Updated successfully");
            }
            queryClient.invalidateQueries({ queryKey: ["timings"] });
        },
        onError: () => {
            toast.error(t("update_error") || "Error updating");
        }
    });
};

export const useAddTimingDay = () => {
    const queryClient = useQueryClient();
    const t = useTranslations("Timing");
    
    return useMutation({
        mutationFn: addTimingDay,
        onSuccess: (res) => {
            if (res?.status === "success" || res?.status === true || res?.status === 200) {
                toast.success(res?.message || t("add_success") || "Added successfully");
            } else {
                toast.success(t("add_success") || "Added successfully");
            }
            queryClient.invalidateQueries({ queryKey: ["timings"] });
        },
        onError: () => {
            toast.error(t("add_error") || "Error adding");
        }
    });
};
