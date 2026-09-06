"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useUsersChats } from "@/features/users-chats/hooks"
import { UserChatItem } from "@/features/users-chats/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { Mail, Clock, MessageCircle } from "lucide-react"

export function UsersChatsTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useUsersChats(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<UserChatItem>[]>(() => [
    {
      id: "index",
      header: "#",
      size: 60,
      cell: ({ row }) => {
        const index = (page - 1) * (data?.meta?.per_page || 10) + row.index + 1;
        return <div className="font-medium text-zinc-900 dark:text-zinc-100 px-2">{index}</div>;
      },
    },
    {
      id: "user",
      header: () => <div className="text-right">المستخدم (User)</div>,
      size: 300,
      cell: ({ row }) => {
        // According to the data, sender and receiver are often the same user in a chat list context, 
        // representing the participant who started the chat. We use the sender object.
        const user = row.original.sender
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-zinc-200 dark:border-zinc-800">
              {user.image && <AvatarImage src={user.image} alt={user.name} className="object-cover" />}
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{user.name}</span>
              <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5">
                <Mail className="w-3 h-3" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      id: "last_message",
      header: () => <div className="text-right">آخر رسالة (Last Message)</div>,
      size: 300,
      cell: ({ row }) => {
        const lastMessage = row.original.last_message
        const count = row.original.unread_messages_count
        
        if (!lastMessage) return <span className="text-zinc-400">-</span>
        
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-start justify-between gap-4">
              <span className="text-zinc-700 dark:text-zinc-300 line-clamp-1 max-w-[200px]" title={lastMessage.message}>
                {lastMessage.message_type === "text" ? lastMessage.message : `[${lastMessage.message_type}]`}
              </span>
              {count > 0 && (
                <div className="flex items-center justify-center min-w-[20px] h-5 rounded-full bg-red-500 text-white text-[10px] font-bold px-1.5 shrink-0">
                  {count}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-zinc-400">
              <Clock className="w-3 h-3" />
              <span>{lastMessage.agoTime}</span>
            </div>
          </div>
        )
      }
    },
    {
      id: "actions",
      header: () => <div className="text-center">{t("actions")}</div>,
      size: 80,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[{ text: t("details"), href: `/contact/users-chats/show/${row.original.id}` }]} />
          </div>
        )
      },
    },
  ], [t, page, data?.meta?.per_page])

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="w-full relative">
      <DataTable
        columns={columns}
        data={data?.data || []}
        bottomContent={<UrlPagination pageCount={data?.meta?.last_page || 1} />}
      />
    </div>
  )
}
