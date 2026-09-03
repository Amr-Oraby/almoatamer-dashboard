import { apiClient } from "@/lib/api/client";
import { ClientMessagesResponse } from "@/app/types/ClientMessageType";

export async function getClientMessages(page: number = 1): Promise<ClientMessagesResponse> {
  const url = `/api/client-messages?page=${page}`;
  return apiClient<ClientMessagesResponse>(url);
}
