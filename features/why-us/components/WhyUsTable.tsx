"use client"

import { useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"
import { DeleteDialog } from "@/components/ui/delete-dialog"
import Image from "next/image"

import { useWhyUsItems, useDeleteWhyUs } from "@/features/why-us/hooks"
import { WhyUsItem } from "@/features/why-us/types"
import { UpdateWhyUsModal } from "./UpdateWhyUsModal"

export function WhyUsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useWhyUsItems(page)

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [updateId, setUpdateId] = useState<string | null>(null)
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteWhyUs()

  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<WhyUsItem>[]>(() => [
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
      id: "title",
      header: () => <div className="text-center">العنوان</div>,
      size: 250,
      cell: ({ row }) => {
        const item = row.original
        const title = item.title || "بدون عنوان"
        const icon = item.icon

        return (
          <div className="flex items-center gap-3 justify-start">
            <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm relative">
              {icon ? (
                <Image src={icon} alt={title} fill className="object-contain p-2" unoptimized />
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold">{title.substring(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{title}</span>
            </div>
          </div>
        )
      },
    },
    {
      id: "description",
      header: () => <div className="text-center">الوصف</div>,
      size: 300,
      cell: ({ row }) => (
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-[300px]" title={row.original.description}>
          {row.original.description || "بدون وصف"}
        </div>
      )
    },
    {
      id: "actions",
      header: () => <div className="text-center">{t("actions")}</div>,
      size: 130,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[
              { text: t("details"), href: `/ui-management/why-us/show/${row.original.id}` },
              { text: "تعديل", onClick: () => setUpdateId(String(row.original.id)) },
              { text: "حذف", onClick: () => setDeleteId(String(row.original.id)), isDestructive: true },
            ]} />
          </div>
        )
      },
    },
  ], [t, router, page, data?.meta?.per_page])

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
      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteItem(deleteId, { onSettled: () => setDeleteId(null) });
        }}
        isDeleting={isDeleting}
      />
      <UpdateWhyUsModal
        isOpen={!!updateId}
        onClose={() => setUpdateId(null)}
        itemId={updateId}
      />
    </div>
  )
}
