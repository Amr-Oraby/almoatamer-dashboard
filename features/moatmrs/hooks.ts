import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMoatmrs, getMoatmr, deleteMoatmr, getMoatmrsWithoutPagination, toggleAcceptMoatmr, createMoatmr, updateMoatmr } from "./api";
import { toast } from "sonner";

export function useMoatmrs(page: number = 1, filters?: Record<string, string | null>) {
    return useQuery({
        queryKey: ["moatmrs", page, filters],
        queryFn: () => getMoatmrs(page, filters),
    });
}
export function useMoatmrsWithoutPagination() {
    return useQuery({
        queryKey: ["moatmrs-without-pagination"],
        queryFn: () => getMoatmrsWithoutPagination(),
    });
}

export function useMoatmr(id: string) {
    return useQuery({
        queryKey: ["moatmr", id],
        queryFn: () => getMoatmr(id),
        enabled: !!id,
    });
}

export function useDeleteMoatmr() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMoatmr,
        onSuccess: (data: any) => {
            toast.success(data.message || "تم الحذف بنجاح!");
            queryClient.invalidateQueries({ queryKey: ["moatmrs"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "فشل الحذف");
        },
    })
}

export function useToggleAcceptMoatmr() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleAcceptMoatmr,
        onSuccess: (data: any) => {
            toast.success(data.message || "تم تغيير حالة القبول بنجاح");
            queryClient.invalidateQueries({ queryKey: ["moatmrs"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "حدث خطأ أثناء تغيير حالة القبول");
        },
    });
}

export function useCreateMoatmr() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => createMoatmr(data),
        onSuccess: (data: any) => {
            toast.success(data.message || "تم إضافة المعتمر بنجاح");
            queryClient.invalidateQueries({ queryKey: ["moatmrs"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "حدث خطأ أثناء الإضافة");
        },
    });
}

export function useUpdateMoatmr(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => updateMoatmr(id, data),
        onSuccess: (data: any) => {
            toast.success(data.message || "تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["moatmrs"] });
            queryClient.invalidateQueries({ queryKey: ["moatmr", id] });
        },
        onError: (error: any) => {
            toast.error(error.message || "حدث خطأ أثناء التعديل");
        },
    });
}