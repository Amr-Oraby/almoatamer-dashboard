import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, deleteNotification } from "./api";
import { toast } from "sonner";

export function useNotifications(page: number = 1) {
    return useQuery({
        queryKey: ["notifications", page],
        queryFn: () => getNotifications(page),
    });
}

export function useDeleteNotification() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteNotification,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}
