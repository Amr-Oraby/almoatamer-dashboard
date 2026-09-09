import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFaqs, getFaq, deleteFaq, createFaq, updateFaq } from "./api";
import { toast } from "sonner";

export function useFaqs(page: number = 1) {
    return useQuery({
        queryKey: ["faqs", page],
        queryFn: () => getFaqs(page),
    });
}

export function useFaq(id: string) {
    return useQuery({
        queryKey: ["faq", id],
        queryFn: () => getFaq(id),
        enabled: !!id,
    });
}

export function useDeleteFaq() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteFaq,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم الحذف بنجاح");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الحذف");
        },
    });
}

export function useCreateFaq() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createFaq,
        onSuccess: (data: any) => {
            toast.success(data?.message || "تمت الإضافة بنجاح");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء الإضافة");
        },
    });
}

export function useUpdateFaq(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => updateFaq(id, formData),
        onSuccess: (data: any) => {
            toast.success(data?.message || "تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
            queryClient.invalidateQueries({ queryKey: ["faq", id] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "حدث خطأ أثناء التعديل");
        },
    });
}
