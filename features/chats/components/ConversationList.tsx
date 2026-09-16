"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { useConversations } from "@/features/chats/hooks"
import { Conversation } from "@/features/chats/types"
import { Loader2, Search, User } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ConversationListProps {
  onSelectChat: (id: number) => void;
  selectedChatId: number | null;
}

export function ConversationList({ onSelectChat, selectedChatId }: ConversationListProps) {
  const { data, isLoading, isError } = useConversations();
  const t = useTranslations("Chats");
  const [search, setSearch] = useState("");

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6 text-zinc-500">
        {t("error_loading", { fallback: "Failed to load chats" })}
      </div>
    );
  }

  let filteredConversations = data.data;
  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredConversations = filteredConversations.filter(c => 
      c.receiver?.name?.toLowerCase().includes(lowerSearch) || 
      c.receiver?.email?.toLowerCase().includes(lowerSearch) || 
      c.receiver?.phone?.includes(lowerSearch)
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 border-r border-zinc-100 dark:border-zinc-800">
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder={t("search_chats", { fallback: "Search chats..." })}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full py-2 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-sm text-zinc-500">
            {t("no_chats_found", { fallback: "No conversations found" })}
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filteredConversations.map((chat: Conversation) => (
              <li 
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={cn(
                  "cursor-pointer p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors",
                  selectedChatId === chat.id ? "bg-zinc-50 dark:bg-zinc-900/80 border-l-4 border-primary" : "border-l-4 border-transparent"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                    {chat.receiver?.image ? (
                      <Image 
                        src={chat.receiver.image} 
                        alt={chat.receiver.name || "User Avatar"} 
                        width={48} 
                        height={48} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <User className="h-6 w-6 text-zinc-400" />
                    )}
                    {chat.receiver?.is_active && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-950 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate pr-2">
                        {chat.receiver?.name || t("unknown_user", { fallback: "Unknown User" })}
                      </h3>
                      {chat.last_message && (
                        <span className="text-[10px] text-zinc-400 shrink-0 font-medium">
                          {chat.last_message.agoTime}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-xs text-zinc-500 truncate">
                        {chat.last_message?.message || t("no_messages_yet", { fallback: "No messages yet" })}
                      </p>
                      {chat.unread_messages_count > 0 && (
                        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                          {chat.unread_messages_count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
