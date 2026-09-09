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


import { useBlogsList, useDeleteBlog } from "@/features/blogs/hooks"
import { BlogItem } from "@/features/blogs/types"
import Image from "next/image"
import { DeleteDialog } from "@/components/ui/delete-dialog";



export function BlogsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useBlogsList(page)
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")
  const tCommon = useTranslations("Common")

  const columns = useMemo<ColumnDef<BlogItem>[]>(() => [
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
              { text: t("details"), href: `/blogs/show/${row.original.id}` },
              { text: "تعديل", href: `/blogs/update/${row.original.id}` },
              { text: "حذف", onClick: () => setDeleteId(String(row.original.id)) }
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
          if (deleteId) {
            deleteBlog(deleteId, {
              onSuccess: () => setDeleteId(null),
            });
          }
        }}
        isDeleting={isDeleting}
      />
    </div>
  )
}
