import { useQuery } from "@tanstack/react-query";
import { getAbouts, getAbout } from "./api";

export function useAbouts(page: number = 1) {
    return useQuery({
        queryKey: ["abouts", page],
        queryFn: () => getAbouts(page),
    });
}

export function useAbout(id: string) {
    return useQuery({
        queryKey: ["about", id],
        queryFn: () => getAbout(id),
        enabled: !!id,
    });
}
