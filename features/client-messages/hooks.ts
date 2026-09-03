import { useQuery } from "@tanstack/react-query";
import { getClientMessages } from "./api";
import { ClientMessagesResponse } from "@/app/types/ClientMessageType";

interface UseClientMessagesOptions {
  page?: number;
}

export function useClientMessages({ page = 1 }: UseClientMessagesOptions = {}) {
  return useQuery<ClientMessagesResponse>({
    queryKey: ["client-messages", { page }],
    queryFn: () => getClientMessages(page),
  });
}
