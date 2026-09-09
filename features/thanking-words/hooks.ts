import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getThankingWords, getThankingWord, createThankingword, deleteThankingWord, updateThankingWord } from "./api";
import { toast } from "sonner";
import { CreateThankingWordFormValues } from "./schemas";

export function useThankingWords(page: number = 1) {
    return useQuery({
        queryKey: ["thanking-words", page],
        queryFn: () => getThankingWords(page),
    });
}

export function useThankingWord(id: string) {
    return useQuery({
        queryKey: ["thanking-word", id],
        queryFn: () => getThankingWord(id),
        enabled: !!id,
    });
}

export function useCreateThankingWord() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateThankingWordFormValues) => createThankingword(data),
        onSuccess: (response) => {
            if (response.status === "success") {
                toast.success(response.message || "Created successfully");
                queryClient.invalidateQueries({ queryKey: ["thanking-words"] });
            } else {
                toast.error(response.message || "Something went wrong");
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong");
        },
    });
}

export function useDeleteThankingWord() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number | string) => deleteThankingWord(id),
        onSuccess: (response) => {
            if (response.status === "success") {
                toast.success(response.message || "Deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["thanking-words"] });
            } else {
                toast.error(response.message || "Something went wrong");
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong");
        },
    });
}

export function useUpdateThankingWord(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateThankingWord,
        onSuccess: (response: any) => {
            if (response.status === "success") {
                toast.success(response.message || "Updated successfully");
                queryClient.invalidateQueries({ queryKey: ["thanking-words"] });
                queryClient.invalidateQueries({ queryKey: ["thanking-word", id] });
            } else {
                toast.error(response.message || "Something went wrong");
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong");
        },
    });
}
