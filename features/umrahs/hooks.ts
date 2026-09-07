import { useQuery } from "@tanstack/react-query";
import { getUmrahs, getUmrah } from "./api";
import { UmrahsResponse, SingleUmrahResponse } from "./types";

export function useUmrahs(page: number, is_paid?: string | null) {
  return useQuery<UmrahsResponse>({
    queryKey: ["umrahs", page, is_paid],
    queryFn: () => getUmrahs(page, is_paid),
  });
}

export function useUmrah(id: string) {
  return useQuery<SingleUmrahResponse>({
    queryKey: ["umrah", id],
    queryFn: () => getUmrah(id),
    enabled: !!id,
  });
}

