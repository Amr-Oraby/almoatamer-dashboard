"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useTerms } from "@/features/terms/hooks"
import { TermItem } from "@/features/terms/types"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TermsTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useTerms(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<TermItem>[]>(() => [
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
      id: "term_ar",
      header: () => <div className="text-right">العنوان (عربي)</div>,
      size: 250,
      cell: ({ row }) => (
        <div className="flex items-start gap-2">
          <FileText className="w-4 h-4 text-primary mt-1 shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2" title={row.original.ar?.title || ""}>
              {row.original.ar?.title || "-"}
            </span>
            <div 
              className="text-sm text-zinc-500 line-clamp-1 mt-1 prose prose-sm prose-zinc" 
              dangerouslySetInnerHTML={{ __html: row.original.ar?.desc || "-" }}
            />
          </div>
        </div>
      )
    },
    {
      id: "term_en",
      header: () => <div className="text-left" dir="ltr">Title (English)</div>,
      size: 250,
      cell: ({ row }) => (
        <div className="flex items-start gap-2" dir="ltr">
          <FileText className="w-4 h-4 text-primary mt-1 shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2" title={row.original.en?.title || ""}>
              {row.original.en?.title || "-"}
            </span>
            <div 
              className="text-sm text-zinc-500 line-clamp-1 mt-1 prose prose-sm prose-zinc" 
              dangerouslySetInnerHTML={{ __html: row.original.en?.desc || "-" }}
            />
          </div>
        </div>
      )
    },
    {
      id: "is_active",
      header: () => <div className="text-center">الحالة</div>,
      size: 100,
      cell: ({ row }) => {
        const isActive = row.original.is_active === 1
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
            <TableActionMenu items={[{ text: t("details"), href: `/public-pages/terms/show/${row.original.id}` }]} />
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
