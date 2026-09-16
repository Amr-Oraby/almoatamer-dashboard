"use client"

import { useState } from "react"
import { ConversationList } from "./ConversationList"
import { ChatWindow } from "./ChatWindow"

export function ChatsLayout() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  return (
    <div className="flex h-[calc(100vh-140px)] w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
      {/* Sidebar - Conversation List */}
      <div className="w-full md:w-[350px] lg:w-[400px] shrink-0 h-full border-r border-zinc-200 dark:border-zinc-800 rtl:border-r-0 rtl:border-l">
        <ConversationList 
          onSelectChat={setSelectedChatId} 
          selectedChatId={selectedChatId} 
        />
      </div>

      {/* Main Area - Chat Window */}
      <div className="hidden md:flex flex-1 h-full bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="w-full h-full">
            <ChatWindow chatId={selectedChatId} />
        </div>
      </div>
    </div>
  )
}
