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
import { UrlSearchFilter } from "@/components/ui/url-search-filter"
import { ClearFiltersButton } from "@/components/ui/clear-filters-button"

import { useNewsList, useDeleteNews } from "@/features/news/hooks"
import { NewsItem } from "@/features/news/types"
import Image from "next/image"
import { DeleteDialog } from "@/components/ui/delete-dialog"
import { UpdateNewsModal } from "./UpdateNewsModal"

export function NewsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const filters = {
    keyword: searchParams.get("keyword"),
  }
  const { data, isLoading } = useNewsList(page, filters)
  const { mutate: deleteNews, isPending: isDeleting } = useDeleteNews()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [updateId, setUpdateId] = useState<string | null>(null)

  const t = useTranslations("Umrahs")
  const tCommon = useTranslations("Common")

  const columns = useMemo<ColumnDef<NewsItem>[]>(() => [
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
      header: () => <div className="text-center">{tCommon("title")}</div>,
      size: 300,
      cell: ({ row }) => {
        const item = row.original
        const title = item.title || "بدون عنوان"
        const image = item.images?.image

        return (
          <div className="flex items-center gap-3 justify-start">
            <div className="w-12 h-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm relative">
              {image ? (
                <Image src={image} alt={title} fill className="object-cover" unoptimized />
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
      header: () => <div className="text-center">{tCommon("desc")}</div>,
      size: 300,
      cell: ({ row }) => (
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-[300px]" title={row.original.description}>
          {row.original.description || "بدون وصف"}
        </div>
      )
    },
    {
      id: "isBlocked",
      header: () => <div className="text-center">{t("block")}</div>,
      size: 120,
      cell: function Cell({ row }) {
        const [isBlocked, setIsBlocked] = useState(!row.original.is_active)
        return (
          <div className="flex items-center justify-center">
            <Switch checked={isBlocked} onChange={() => setIsBlocked(!isBlocked)} />
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">{t("actions")}</div>,
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[
              { text: t("details"), href: `/news/show/${row.original.id}` },
              { text: "تعديل", onClick: () => setUpdateId(String(row.original.id)) },
              { text: "حذف", onClick: () => setDeleteId(String(row.original.id)) },
            ]} />
          </div>
        )
      },
    },
  ], [t, tCommon, router, page, data?.meta?.per_page])

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="w-full relative">
      <DataTable
        columns={columns}
        data={data?.data || []}
        topContent={
          <div className="flex flex-wrap items-center gap-3 w-full bg-white dark:bg-zinc-900/50 p-4 rounded-2xl mb-4">
            <UrlSearchFilter
              filterKey="keyword"
              placeholder={tCommon("search_placeholder")}
              buttonText={tCommon("apply")}
            />
            <ClearFiltersButton label={tCommon("clear_filters")} />
          </div>
        }
        bottomContent={<UrlPagination pageCount={data?.meta?.last_page || 1} />}
      />

      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteNews(deleteId, { onSuccess: () => setDeleteId(null) });
          }
        }}
        isDeleting={isDeleting}
      />
      <UpdateNewsModal
        isOpen={!!updateId}
        onClose={() => setUpdateId(null)}
        newsId={updateId}
      />
    </div>
  )
}
