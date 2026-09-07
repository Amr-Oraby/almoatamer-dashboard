"use client"

import { useParams } from "next/navigation"
import { useUsersChat } from "@/features/users-chats/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, MessageCircle, User } from "lucide-react"

export default function UserChatShowPage() {
  const params = useParams()
  const id = params.id as string
  const { data, isLoading, isError } = useUsersChat(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-zinc-500">
        <MessageCircle className="w-12 h-12 mb-4 opacity-20" />
        <p className="text-lg font-medium">لم يتم العثور على المحادثة</p>
      </div>
    )
  }

  const chat = data.data

  return (
    <div className="flex flex-col gap-6 w-full pb-10">

      {/* Participants Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
              {chat.sender.image ? (
                <img src={chat.sender.image} alt={chat.sender.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-zinc-400" />
              )}
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{chat.sender.name}</span>
                <Badge variant="secondary">مرسل</Badge>
              </div>
              <span className="text-sm text-zinc-500" dir="ltr">{chat.sender.email}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
              {chat.receiver.image ? (
                <img src={chat.receiver.image} alt={chat.receiver.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-zinc-400" />
              )}
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{chat.receiver.name}</span>
                <Badge variant="secondary">مستقبل</Badge>
              </div>
              <span className="text-sm text-zinc-500" dir="ltr">{chat.receiver.email}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Messages */}
      <Card className="border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100">سجل الرسائل</h3>
          <span className="text-xs text-zinc-500 font-mono" dir="ltr">{chat.created_at}</span>
        </div>

        <CardContent className="p-6 flex flex-col gap-4 max-h-[600px] overflow-y-auto bg-zinc-50/50 dark:bg-zinc-950/50">
          {chat.messages.length > 0 ? (
            chat.messages.map((msg) => {
              const isSender = msg.sender.id === chat.sender.id;

              return (
                <div key={msg.id} className={`flex w-full ${isSender ? 'justify-start' : 'justify-end'}`}>
                  <div className={`flex flex-col max-w-[80%] gap-1 ${isSender ? 'items-start' : 'items-end'}`}>
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        {msg.sender.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono" dir="ltr">
                        {new Date(msg.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm ${isSender
                        ? 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-tr-sm border border-zinc-200 dark:border-zinc-800'
                        : 'bg-primary text-primary-foreground rounded-tl-sm'
                        }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-zinc-400">
              <MessageCircle className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-sm">لا توجد رسائل</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
