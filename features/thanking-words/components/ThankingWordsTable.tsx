"use client"

import { useState, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useThankingWords, useDeleteThankingWord } from "@/features/thanking-words/hooks"
import { ThankingWord } from "@/features/thanking-words/types"
import { DeleteDialog } from "@/components/ui/delete-dialog"
import Image from "next/image"



export function ThankingWordsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useThankingWords(page)
  
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteThankingWord()

  const handleDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete, {
        onSettled: () => setItemToDelete(null)
      })
    }
  }
  
  // Using "Umrahs" namespace for generic keys that we know exist, and hardcoding missing ones gracefully
  const tUmrahs = useTranslations("Umrahs")
  const t = useTranslations("ThankingWords")

  const columns = useMemo<ColumnDef<ThankingWord>[]>(() => [
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
      id: "name",
      header: t("name"),
      size: 250,
      cell: ({ row }) => {
        const person = row.original
        const name = person.name || "بدون اسم"
        const image = person.image

        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm relative">
              {image ? (
                <Image src={image} alt={name} fill className="object-cover" unoptimized />
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold">{name.substring(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{name}</span>
            </div>
          </div>
        )
      },
    },
    {
      id: "text",
      header: () => <div className="text-center">{t("text", { fallback: "Text Content" })}</div>,
      size: 300,
      cell: ({ row }) => (
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-[300px]" title={row.original.text}>
          {row.original.text}
        </div>
      )
    },
    {
      id: "date",
      header: () => <div className="text-center">{t("date", { fallback: "Date" })}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.date}
        </div>
      )
    },
    {
      id: "status",
      header: () => <div className="text-center">{t("status", { fallback: "Status" })}</div>,
      size: 140,
      cell: ({ row }) => {
        const isActive = row.original.is_active;
        return (
          <div className="flex items-center justify-center">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-bold transition-colors",
              isActive 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            )}>
              {isActive ? t("active", { fallback: "Active" }) : t("inactive", { fallback: "Inactive" })}
            </span>
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">{tUmrahs("actions", { fallback: "Actions" })}</div>,
      size: 130,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[
              { text: tUmrahs("details", { fallback: "Details" }), href: `/ui-management/thanking-word/show/${row.original.id}` },
              { text: tUmrahs("delete", { fallback: "Delete" }), onClick: () => setItemToDelete(row.original.id), isDestructive: true }
            ]} />
          </div>
        )
      },
    },
  ], [t, tUmrahs, router, page, data?.meta?.per_page])

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
        isOpen={itemToDelete !== null}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
