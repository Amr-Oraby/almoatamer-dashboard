"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useSeos } from "@/features/seo/hooks"
import { SeoItem } from "@/features/seo/types"
import { Badge } from "@/components/ui/badge"

export function SeoTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useSeos(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<SeoItem>[]>(() => [
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
      header: () => <div className="text-center">العنوان (Title)</div>,
      size: 400,
      cell: ({ row }) => (
        <div className="text-right font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.title}
        </div>
      )
    },
    {
      id: "seoable_type",
      header: () => <div className="text-center">النوع (Type)</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center">
          <Badge variant="secondary" className="font-mono text-zinc-600 dark:text-zinc-400">
            {row.original.seoable_type}
          </Badge>
        </div>
      )
    },
    {
      id: "is_active",
      header: () => <div className="text-center">الحالة</div>,
      size: 100,
      cell: ({ row }) => {
        const isActive = row.original.is_active
        return (
          <div className="flex justify-center">
            <Badge variant={isActive ? "default" : "secondary"}>
              {isActive ? "نشط" : "غير نشط"}
            </Badge>
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
            <TableActionMenu items={[{ text: t("details"), href: `/seo/show/${row.original.id}` }]} />
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
    </div>
  )
}
