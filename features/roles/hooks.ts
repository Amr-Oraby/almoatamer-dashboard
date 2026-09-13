import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRoles, getRole, deleteRole, updateRole, toggleRoleStatus } from "./api";
import { toast } from "sonner";

export function useRoles(page: number = 1) {
    return useQuery({
        queryKey: ["roles", page],
        queryFn: () => getRoles(page),
        select: (data) => {
            if (data?.data) {
                const deduplicatedRoles = data.data.map(role => {
                    if (role.permission) {
                        const uniquePermissions = Array.from(
                            new Map(role.permission.map(p => [p.id, p])).values()
                        );
                        return { ...role, permission: uniquePermissions };
                    }
                    return role;
                });
                return { ...data, data: deduplicatedRoles };
            }
            return data;
        },
    });
}

export function useRole(id: string) {
    return useQuery({
        queryKey: ["role", id],
        queryFn: () => getRole(id),
        enabled: !!id,
        select: (data) => {
            if (data?.permission) {
                const uniquePermissions = Array.from(
                    new Map(data.permission.map(p => [p.id, p])).values()
                );
                return { ...data, permission: uniquePermissions };
            }
            return data;
        },
    });
}

export function useDeleteRole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRole,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}

export function useUpdateRole(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => updateRole(id, data),
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم تحديث الدور بنجاح");
            queryClient.invalidateQueries({ queryKey: ["role", id] });
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء التحديث");
        },
    });
}

export function useToggleRoleStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleRoleStatus,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم تحديث الحالة بنجاح");
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء تحديث الحالة");
        },
    });
}
