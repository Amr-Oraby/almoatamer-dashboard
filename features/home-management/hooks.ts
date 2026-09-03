import { useQuery } from "@tanstack/react-query";
import { homeManagementApi } from "./api";

export function useUmrahHomeInfo() {
  return useQuery({
    queryKey: ["umrah-home-info"],
    queryFn: () => homeManagementApi.getUmrahHomeInfo(),
  });
}

export function useMoatmerHomeInfo() {
  return useQuery({
    queryKey: ["moatmer-home-info"],
    queryFn: () => homeManagementApi.getMoatmerHomeInfo(),
  });
}

export function useStatistics() {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: () => homeManagementApi.getStatistics(),
  });
}
