import { useQuery } from "@tanstack/react-query";
import { getHomeBanners, getHomeBanner } from "./api";

export function useHomeBanners(page: number = 1) {
    return useQuery({
        queryKey: ["home-banners", page],
        queryFn: () => getHomeBanners(page),
    });
}

export function useHomeBanner(id: string) {
    return useQuery({
        queryKey: ["home-banner", id],
        queryFn: () => getHomeBanner(id),
        enabled: !!id,
    });
}
