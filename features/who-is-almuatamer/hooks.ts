import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWhoIsAlmuatamerInfo, updateWhoIsAlmuatamerInfo } from "./api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useWhoIsAlmuatamerInfo = () => {
  return useQuery({
    queryKey: ["whoIsAlmuatamerInfo"],
    queryFn: () => getWhoIsAlmuatamerInfo(),
  });
};

export const useUpdateWhoIsAlmuatamerInfo = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("Settings");

  return useMutation({
    mutationFn: updateWhoIsAlmuatamerInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whoIsAlmuatamerInfo"] });
      toast.success(t("success_update_message", { fallback: "Updated successfully" }));
    },
    onError: () => {
      toast.error(t("error_update_message", { fallback: "An error occurred during update" }));
    },
  });
};
