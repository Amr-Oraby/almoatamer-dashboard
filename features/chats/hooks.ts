import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getConversations, getChat, sendMessage } from "./api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useConversations() {
    return useQuery({
        queryKey: ["conversations"],
        queryFn: getConversations,
    });
}

export function useChat(chatId: string | number | null) {
    return useQuery({
        queryKey: ["chat", chatId],
        queryFn: () => getChat(chatId!),
        enabled: !!chatId,
    });
}

export function useSendMessage() {
    const queryClient = useQueryClient();
    const t = useTranslations("Chats");
    
    return useMutation({
        mutationFn: sendMessage,
        onSuccess: (data, variables) => {
            toast.success(t("message_sent", { fallback: "Message sent successfully" }));
            // We need to invalidate the specific chat query. The chatId is in the formData.
            const chatId = variables.get("chat_id");
            if (chatId) {
                queryClient.invalidateQueries({ queryKey: ["chat", Number(chatId)] });
            }
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        },
        onError: () => {
            toast.error(t("send_failed", { fallback: "Failed to send message" }));
        }
    });
}
