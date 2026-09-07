import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHowToStart, updateHowToStart } from "./api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useHowToStart() {
    return useQuery({
        queryKey: ["how-to-start"],
        queryFn: getHowToStart,
    });
}

export function useUpdateHowToStart() {
    const queryClient = useQueryClient();
    const t = useTranslations("HowToStart");

    return useMutation({
        mutationFn: updateHowToStart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["how-to-start"] });
            toast.success(t("success", { fallback: "Updated successfully" }));
        },
        onError: () => {
            toast.error(t("error", { fallback: "An error occurred" }));
        }
    });
}
