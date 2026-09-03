import { useQuery } from "@tanstack/react-query";
import { getUmrahs, getUmrah } from "./api";
import { UmrahsResponse, SingleUmrahResponse } from "./types";

export function useUmrahs(page: number) {
  return useQuery<UmrahsResponse>({
    queryKey: ["umrahs", page],
    queryFn: () => getUmrahs(page),
  });
}

export function useUmrah(id: string) {
  return useQuery<SingleUmrahResponse>({
    queryKey: ["umrah", id],
    queryFn: () => getUmrah(id),
    enabled: !!id,
  });
}

