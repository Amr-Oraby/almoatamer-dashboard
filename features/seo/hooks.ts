import { useQuery } from "@tanstack/react-query";
import { seoApi } from "./api";

export function useSeo(page: number = 1) {
  return useQuery({
    queryKey: ["seo", page],
    queryFn: () => seoApi.getSeoData(page),
  });
}
