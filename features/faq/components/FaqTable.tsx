"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useFaqs } from "@/features/faq/hooks"
import { FaqItem } from "@/features/faq/types"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { HelpCircle } from "lucide-react"

export function FaqTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useFaqs(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<FaqItem>[]>(() => [
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
      id: "question_ar",
      header: () => <div className="text-right">السؤال (عربي)</div>,
      size: 250,
      cell: ({ row }) => (
        <div className="flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2" title={row.original.ar?.question || ""}>
              {row.original.ar?.question || "-"}
            </span>
            <span className="text-sm text-zinc-500 line-clamp-1 mt-1" title={row.original.ar?.answer || ""}>
              {row.original.ar?.answer || "-"}
            </span>
          </div>
        </div>
      )
    },
    {
      id: "question_en",
      header: () => <div className="text-left" dir="ltr">Question (English)</div>,
      size: 250,
      cell: ({ row }) => (
        <div className="flex items-start gap-2" dir="ltr">
          <HelpCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2" title={row.original.en?.question || ""}>
              {row.original.en?.question || "-"}
            </span>
            <span className="text-sm text-zinc-500 line-clamp-1 mt-1" title={row.original.en?.answer || ""}>
              {row.original.en?.answer || "-"}
            </span>
          </div>
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
            <TableActionMenu items={[{ text: t("details"), href: `/public-pages/faq/show/${row.original.id}` }]} />
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
