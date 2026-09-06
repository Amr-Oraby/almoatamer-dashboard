import { useQuery } from "@tanstack/react-query";
import { getFaqs, getFaq } from "./api";

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
