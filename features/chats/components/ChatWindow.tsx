"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useChat, useSendMessage } from "@/features/chats/hooks"
import { Loader2, User, Phone, Mail, Send, Info, Paperclip } from "lucide-react"

interface ChatWindowProps {
  chatId: number | null;
}

export function ChatWindow({ chatId }: ChatWindowProps) {
  const t = useTranslations("Chats");
  const { data, isLoading, isError } = useChat(chatId);
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  const [messageText, setMessageText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageText.trim() || !data?.data) return;

    const formData = new FormData();
    formData.append("chat_id", String(data.data.id));
    formData.append("reciever_id", String(data.data.receiver.id));
    formData.append("message_type", "text");
    formData.append("message", messageText.trim());

    sendMessage(formData, {
      onSuccess: () => setMessageText(""),
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !data?.data) return;

    const isImage = file.type.startsWith("image/");
    const formData = new FormData();
    formData.append("chat_id", String(data.data.id));
    formData.append("reciever_id", String(data.data.receiver.id));
    formData.append("message_type", isImage ? "image" : "file");
    formData.append("message", file);

    sendMessage(formData);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  if (!chatId) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-zinc-50 dark:bg-zinc-900/20 text-zinc-400">
        <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-200 dark:border-zinc-800">
          <Info className="w-8 h-8 text-zinc-300" />
        </div>
        <p className="text-lg font-medium">{t("select_a_chat", { fallback: "Select a chat to view messages" })}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-50 dark:bg-zinc-900/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-50 dark:bg-zinc-900/20 text-zinc-500">
        {t("error_loading_chat", { fallback: "Failed to load chat details" })}
      </div>
    );
  }

  const chat = data.data;
  const receiver = chat.receiver;

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/20 relative">
      {/* Chat Header */}
      <div className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center px-6 shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
            {receiver?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <Image width={400} height={400} src={receiver.image} alt={receiver.name} className="w-full h-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-zinc-400" />
            )}
          </div>
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {receiver?.name || t("unknown_user", { fallback: "Unknown User" })}
            </h2>
            <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium mt-0.5">
              {receiver?.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {receiver.phone_code ? `+${receiver.phone_code}` : ''} {receiver.phone}
                </span>
              )}
              {receiver?.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {receiver.email}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        {chat.messages && chat.messages.length > 0 ? (
          chat.messages.map((msg) => {
            const isMe = msg.type === "me";
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  isMe 
                    ? 'bg-primary text-primary-foreground rounded-br-sm' 
                    : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-sm border border-zinc-100 dark:border-zinc-700 shadow-sm'
                }`}>
                  {msg.message_type === 'image' || msg.message_type === 'file' ? (
                    <div className="relative w-full max-w-[300px] mb-2 rounded-lg overflow-hidden">
                      <Image 
                        src={msg.message} 
                        alt="Message attachment" 
                        width={300}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ) : (
                    <p className="text-sm">{msg.message}</p>
                  )}
                  <span className={`text-[10px] block mt-1 ${isMe ? 'text-primary-foreground/70' : 'text-zinc-400'}`}>
                    {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 gap-2 opacity-60">
            <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
              <span className="text-xl">👋</span>
            </div>
            <p className="text-sm font-medium">{t("no_messages_yet", { fallback: "No messages yet" })}</p>
          </div>
        )}
      </div>

      {/* Message Input Area */}
      <div className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
        <form onSubmit={handleSendText} className="flex items-center gap-2">
          {/* File attachment */}
          <input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSending}
            className="w-10 h-10 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center disabled:opacity-50 transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input 
            type="text" 
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={t("type_message", { fallback: "Type a message..." })}
            className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
            disabled={isSending}
          />
          <button 
            type="submit"
            disabled={!messageText.trim() || isSending} 
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4 rtl:-scale-x-100" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
