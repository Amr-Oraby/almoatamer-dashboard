import { useQuery } from "@tanstack/react-query";
import { getThankingWords, getThankingWord } from "./api";

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
