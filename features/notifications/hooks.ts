import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "./api";

export function useNotifications(page: number = 1) {
    return useQuery({
        queryKey: ["notifications", page],
        queryFn: () => getNotifications(page),
    });
}
