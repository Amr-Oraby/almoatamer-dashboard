import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMainSectionInfo, updateMainSectionInfo } from "./api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useMainSectionInfo = () => {
  return useQuery({
    queryKey: ["mainSectionInfo"],
    queryFn: () => getMainSectionInfo(),
  });
};

export const useUpdateMainSectionInfo = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("Settings");

  return useMutation({
    mutationFn: updateMainSectionInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainSectionInfo"] });
      toast.success(t("success_update_message", { fallback: "Updated successfully" }));
    },
    onError: () => {
      toast.error(t("error_update_message", { fallback: "An error occurred during update" }));
    },
  });
};
