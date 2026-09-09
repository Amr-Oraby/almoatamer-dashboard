import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReportReasons, getReportReason, deleteReportReason, createReportReason, updateReportReason } from "./api";
import { toast } from "sonner";

export function useReportReasons(page: number = 1) {
    return useQuery({
        queryKey: ["report-reasons", page],
        queryFn: () => getReportReasons(page),
    });
}

export function useReportReason(id: string) {
    return useQuery({
        queryKey: ["report-reason", id],
        queryFn: () => getReportReason(id),
        enabled: !!id,
    });
}

export function useDeleteReportReason() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteReportReason,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["report-reasons"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}

export function useCreateReportReason() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createReportReason,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تمت الإضافة بنجاح");
            queryClient.invalidateQueries({ queryKey: ["report-reasons"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الإضافة");
        },
    });
}

export function useUpdateReportReason(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateReportReason,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["report-reasons"] });
            queryClient.invalidateQueries({ queryKey: ["report-reason", id] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء التعديل");
        },
    });
}
