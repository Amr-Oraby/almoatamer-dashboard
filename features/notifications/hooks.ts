import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
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

export function useInfiniteNotifications() {
    return useInfiniteQuery({
        queryKey: ["infinite-notifications"],
        queryFn: ({ pageParam = 1 }) => getNotifications(pageParam),
        getNextPageParam: (lastPage) => {
            const hasMore = lastPage.meta.current_page < lastPage.meta.last_page;
            return hasMore ? lastPage.meta.current_page + 1 : undefined;
        },
        initialPageParam: 1,
    });
}
