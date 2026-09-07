import { useQuery } from "@tanstack/react-query";
import { getUmrahs, getUmrah } from "./api";
import { UmrahsResponse, SingleUmrahResponse } from "./types";

export function useUmrahs(page: number, filters: Record<string, string | null | undefined> = {}) {
  return useQuery<UmrahsResponse>({
    queryKey: ["umrahs", page, filters],
    queryFn: () => getUmrahs(page, filters),
  });
}

export function useUmrah(id: string) {
  return useQuery<SingleUmrahResponse>({
    queryKey: ["umrah", id],
    queryFn: () => getUmrah(id),
    enabled: !!id,
  });
}

