import { useQuery } from "@tanstack/react-query";
import { getCountries, getCountry } from "./api";

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
