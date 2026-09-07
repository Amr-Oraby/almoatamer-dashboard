import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCountries, getCountry, deleteCountry } from "./api";
import { toast } from "sonner";

export function useCountries(page: number = 1) {
    return useQuery({
        queryKey: ["countries", page],
        queryFn: () => getCountries(page),
    });
}

export function useCountry(id: string) {
    return useQuery({
        queryKey: ["country", id],
        queryFn: () => getCountry(id),
        enabled: !!id,
    });
}

export function useDeleteCountry() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCountry,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["countries"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}
