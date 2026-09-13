import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWithdrawalRequests, updateWithdrawalRequest } from "./api";
import { toast } from "sonner";

export function useWithdrawalRequests(page: number = 1) {
    return useQuery({
        queryKey: ["withdrawal-requests", page],
        queryFn: () => getWithdrawalRequests(page),
    });
}

export function useUpdateWithdrawalRequest() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, status, status_confirmation }: { id: number; status: 'confirmed' | 'rejected'; status_confirmation: string }) => 
            updateWithdrawalRequest(id, status, status_confirmation),
        onSuccess: () => {
            toast.success("تم تحديث حالة طلب السحب بنجاح");
            queryClient.invalidateQueries({ queryKey: ["withdrawal-requests"] });
        },
        onError: () => {
            toast.error("حدث خطأ أثناء تحديث حالة الطلب");
        },
    });
}


