import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminContacts, updateAdminContacts } from "./api";
import { toast } from "sonner";
import { AdminContactUpdateRequest } from "./types";
import { useTranslations } from "next-intl";

export const adminContactsKeys = {
    all: ["admin-contacts"] as const,
};

export function useAdminContacts() {
    return useQuery({
        queryKey: adminContactsKeys.all,
        queryFn: getAdminContacts,
    });
}

export function useUpdateAdminContacts() {
    const queryClient = useQueryClient();
    const t = useTranslations();

    return useMutation({
        mutationFn: (data: AdminContactUpdateRequest) => updateAdminContacts(data),
        onSuccess: (response) => {
            toast.success(response.message || t("success_update_message", { fallback: "Updated successfully" }));
            queryClient.invalidateQueries({ queryKey: adminContactsKeys.all });
        },
        onError: (error: any) => {
            toast.error(error.message || t("error_update_message", { fallback: "An error occurred during update" }));
        },
    });
}
