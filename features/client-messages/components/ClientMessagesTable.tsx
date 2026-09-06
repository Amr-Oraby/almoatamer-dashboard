"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useClientMessages } from "@/features/client-messages/hooks"
import { ClientMessageItem } from "@/features/client-messages/types"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { Mail, Phone, Calendar } from "lucide-react"

export function ClientMessagesTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useClientMessages(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<ClientMessageItem>[]>(() => [
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
      id: "sender",
      header: () => <div className="text-right">المرسل (Sender)</div>,
      size: 250,
      cell: ({ row }) => {
        const msg = row.original
        // Use user_info name if present, otherwise direct name field
        const name = msg.user_info?.name || msg.name
        const email = msg.user_info?.email || msg.email
        return (
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{name}</span>
            <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
              <Mail className="w-3 h-3" />
              <span>{email}</span>
            </div>
          </div>
        )
      }
    },
    {
      id: "phone",
      header: () => <div className="text-center">الهاتف (Phone)</div>,
      size: 150,
      cell: ({ row }) => {
        const msg = row.original
        const code = msg.user_info?.phone_code || msg.phone_code
        const phone = msg.user_info?.phone || msg.phone
        return (
          <div className="flex items-center justify-center gap-1 text-zinc-600 dark:text-zinc-400 font-mono" dir="ltr">
            <Phone className="w-3 h-3 opacity-50" />
            <span>+{code} {phone}</span>
          </div>
        )
      }
    },
    {
      id: "message_text",
      header: () => <div className="text-right">الرسالة (Message)</div>,
      size: 300,
      cell: ({ row }) => {
        const text = row.original.message_text
        return (
          <div className="text-right text-zinc-700 dark:text-zinc-300 line-clamp-2 max-w-sm" title={text}>
            {text}
          </div>
        )
      }
    },
    {
      id: "created_at",
      header: () => <div className="text-center">التاريخ (Date)</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1 text-zinc-500 text-xs font-mono" dir="ltr">
          <Calendar className="w-3 h-3" />
          <span>{row.original.created_at}</span>
        </div>
      )
    },
    {
      id: "actions",
      header: () => <div className="text-center">{t("actions")}</div>,
      size: 80,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[{ text: t("details"), href: `/contact/messages/show/${row.original.id}` }]} />
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
