import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMoatmrs, getMoatmr, deleteMoatmr } from "./api";
import { toast } from "sonner";

export function useMoatmrs(page: number = 1) {
    return useQuery({
        queryKey: ["moatmrs", page],
        queryFn: () => getMoatmrs(page),
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