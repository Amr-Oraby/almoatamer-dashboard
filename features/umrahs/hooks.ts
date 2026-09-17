import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUmrahs, getUmrah, getUmrahMoatmers, setMoatmerToUmrah, updateStatusAndNotify } from "./api";
import { UmrahsResponse, SingleUmrahResponse, UmrahMoatmersResponse } from "./types";
import { toast } from "sonner";

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

export function useUmrahMoatmers(id: string, page: number = 1) {
  return useQuery<UmrahMoatmersResponse>({
    queryKey: ["umrahMoatmers", id, page],
    queryFn: () => getUmrahMoatmers(id, page),
    enabled: !!id,
  });
}

export function useSetMoatmerToUmrah(umrahId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (moatmerId: string) => setMoatmerToUmrah(umrahId, moatmerId),
    onSuccess: (data: {status: string | number, message: string}) => {
      if (data.status === "success" || data.status === 200) {
        toast.success(data.message || "Updated successfully");
        queryClient.invalidateQueries({ queryKey: ["umrahMoatmers", umrahId] });
      } else {
        toast.error(data.message || "An error occurred");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useUpdateStatusAndNotify(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (umrahId: string) => updateStatusAndNotify(umrahId),
    onSuccess: (data: {status: string | number, message: string}) => {
      if (data.status === "success" || data.status === 200) {
        toast.success(data.message || "Updated successfully");
        queryClient.invalidateQueries({ queryKey: ["umrahs"] });
        if (onSuccessCallback) onSuccessCallback();
      } else {
        toast.error(data.message || "An error occurred");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
