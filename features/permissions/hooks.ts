import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getPermissions, getMyPermissions, getAllPermissions, createPermission, updatePermission, deletePermission } from "./api";

export const usePermissions = (page: number = 1) => {
  return useQuery({
    queryKey: ["permissions", page],
    queryFn: () => getPermissions(page),
  });
};

export const useMyPermissions = () => {
  return useQuery({
    queryKey: ["myPermissions"],
    queryFn: () => getMyPermissions(),
  });
};

export const useAllPermissions = () => {
  return useQuery({
    queryKey: ["allPermissions"],
    queryFn: () => getAllPermissions(),
  });
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPermission,
    onSuccess: (data: any) => {
      toast.success(data?.message || "تم إضافة الصلاحية بنجاح");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      queryClient.invalidateQueries({ queryKey: ["allPermissions"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "حدث خطأ أثناء الإضافة");
    },
  });
};

export const useUpdatePermission = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updatePermission(id, data),
    onSuccess: (data: any) => {
      toast.success(data?.message || "تم تعديل الصلاحية بنجاح");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      queryClient.invalidateQueries({ queryKey: ["allPermissions"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "حدث خطأ أثناء التعديل");
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePermission,
    onSuccess: (data: any) => {
      toast.success(data?.message || "تم الحذف بنجاح");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      queryClient.invalidateQueries({ queryKey: ["allPermissions"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "حدث خطأ أثناء الحذف");
    },
  });
};
