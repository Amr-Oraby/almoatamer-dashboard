import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFooterInfo, updateFooterInfo } from "./api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useFooterInfo = () => {
  return useQuery({
    queryKey: ["footerInfo"],
    queryFn: () => getFooterInfo(),
  });
};

export const useUpdateFooterInfo = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("Settings");

  return useMutation({
    mutationFn: updateFooterInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footerInfo"] });
      toast.success(t("success_update_message", { fallback: "Updated successfully" }));
    },
    onError: () => {
      toast.error(t("error_update_message", { fallback: "An error occurred during update" }));
    },
  });
};
