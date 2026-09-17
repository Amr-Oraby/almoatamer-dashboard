"use client"

import { useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"
import { TableActionMenu } from "@/components/ui/table-action-menu"


import { useNotifications, useDeleteNotification, useReadNotification, useReadAllNotifications } from "@/features/notifications/hooks"
import { NotificationItem } from "@/features/notifications/types"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function NotificationsTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useNotifications(page)
  const { mutate: deleteNotification, isPending: isDeleting } = useDeleteNotification()
  const { mutate: readAllNotifications, isPending: isReadingAll } = useReadAllNotifications()
  const { mutate: readNotification } = useReadNotification()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const t = useTranslations('Dashboard')
  const tCommon = useTranslations('Common')
  
  const columns = useMemo<ColumnDef<NotificationItem>[]>(() => [
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
      id: "status",
      header: () => <div className="text-center">{tCommon("status", { fallback: "الحالة" })}</div>,
      size: 100,
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.is_readed ? (
            <Badge variant="outline" className="text-zinc-500">{tCommon("read", { fallback: "مقروء" })}</Badge>
          ) : (
            <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">{tCommon("unread", { fallback: "غير مقروء" })}</Badge>
          )}
        </div>
      )
    },
    {
      id: "sender",
      header: () => <div className="text-center">{tCommon("sender", { fallback: "المرسل" })}</div>,
      size: 200,
      cell: ({ row }) => {
        const sender = row.original.sender_data
        if (!sender) return <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">{tCommon("system", { fallback: "نظام الإدارة" })}</div>

        return (
          <div className="flex items-center justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 relative">
              {sender.image ? (
                <Image src={sender.image} alt={sender.name} fill className="object-cover" unoptimized />
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold">{sender.name.substring(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{sender.name}</span>
            </div>
          </div>
        )
      }
    },
    {
      id: "content",
      header: () => <div className="text-center">{tCommon("notification", { fallback: "الإشعار" })}</div>,
      size: 350,
      cell: ({ row }) => (
        <div className="flex flex-col justify-center gap-1">
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            {row.original.title}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {row.original.body}
          </span>
        </div>
      )
    },
    {
      id: "notify_type",
      header: () => <div className="text-center">{tCommon("type", { fallback: "النوع" })}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <Badge variant="secondary" className="font-mono text-[10px]">
            {row.original.notify_type}
          </Badge>
        </div>
      )
    },
    {
      id: "dates",
      header: () => <div className="text-center">{tCommon("time", { fallback: "الوقت" })}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {row.original.sending_time_ago}
          </span>
          <span className="text-xs text-zinc-500" dir="ltr">
            {row.original.sending_time}
          </span>
        </div>
      )
    },
    {
      id: "actions",
      header: () => <div className="text-center">{tCommon("actions", { fallback: "إجراءات" })}</div>,
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <TableActionMenu items={[
            ...(row.original.is_readed ? [] : [{ text: t('mark_as_read'), onClick: () => readNotification(String(row.original.id)) }]),
            { text: tCommon("delete", { fallback: "Delete" }), onClick: () => setDeleteId(String(row.original.id)), isDestructive: true }
          ]} />
        </div>
      )
    },
  ], [page, data?.meta?.per_page, t, tCommon, readNotification])

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="w-full relative">
      <DataTable
        columns={columns}
        data={data?.data || []}
        topContent={
          <div className="flex justify-end items-center w-full mb-4">
            <Button 
              onClick={() => readAllNotifications()} 
              disabled={isReadingAll || data?.unread_count === 0} 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {t('mark_all_as_read')}
            </Button>
          </div>
        }
        bottomContent={<UrlPagination pageCount={data?.meta?.last_page || 1} />}
      />

      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteNotification(deleteId, {
              onSuccess: () => setDeleteId(null),
            });
          }
        }}
        isDeleting={isDeleting}
      />
    </div>
  )
}
