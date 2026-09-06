import { useQuery } from "@tanstack/react-query";
import { getUsersChats, getUsersChat } from "./api";

export function useUsersChats(page: number = 1) {
    return useQuery({
        queryKey: ["users-chats", page],
        queryFn: () => getUsersChats(page),
    });
}

export function useUsersChat(id: string) {
    return useQuery({
        queryKey: ["users-chat", id],
        queryFn: () => getUsersChat(id),
        enabled: !!id,
    });
}
