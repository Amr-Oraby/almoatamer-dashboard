import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminContacts, updateAdminContacts } from "./api";
import { AdminContactsResponse, AdminContactsData } from "@/app/types/AdminContactsType";

export function useAdminContacts() {
  return useQuery<AdminContactsResponse>({
    queryKey: ["admin-contacts"],
    queryFn: () => getAdminContacts(),
  });
}

export function useUpdateAdminContacts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AdminContactsData) => updateAdminContacts(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
    },
  });
}
