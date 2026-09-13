import { useQuery } from "@tanstack/react-query";
import { getPermissions, getMyPermissions, getAllPermissions } from "./api";

export const usePermissions = (page: number = 1) => {
  return useQuery({
    queryKey: ["permissions", page],
    queryFn: () => getPermissions(page),
  });
};

export const useMyPermissions = () => {
  return useQuery({
    queryKey: ["myPermissions"],
    queryFn: () => getMyPermissions(),
  });
};

export const useAllPermissions = () => {
  return useQuery({
    queryKey: ["allPermissions"],
    queryFn: () => getAllPermissions(),
  });
};
