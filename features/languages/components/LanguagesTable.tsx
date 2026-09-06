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

import { useLanguages } from "@/features/languages/hooks"
import { LanguageItem } from "@/features/languages/types"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function LanguagesTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useLanguages(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<LanguageItem>[]>(() => [
    {
      id: "index",
      header: "#",
      size: 60,
      cell: ({ row }) => {
        const index = (page - 1) * (data?.meta?.per_page || 25) + row.index + 1;
        return <div className="font-medium text-zinc-900 dark:text-zinc-100 px-2">{index}</div>;
      },
    },
    {
      id: "flag",
      header: () => <div className="text-center">العلم</div>,
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <div className="relative w-12 h-8 rounded overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
              <Image 
                src={row.original.flag} 
                alt={row.original.short_name} 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )
      }
    },
    {
      id: "short_name",
      header: () => <div className="text-center">الرمز</div>,
      size: 100,
      cell: ({ row }) => (
        <div className="text-center">
          <Badge variant="outline" className="font-mono text-zinc-600 dark:text-zinc-400 uppercase">
            {row.original.short_name}
          </Badge>
        </div>
      )
    },
    {
      id: "name_ar",
      header: () => <div className="text-center">الاسم (عربي)</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.ar?.name || "-"}
        </div>
      )
    },
    {
      id: "name_en",
      header: () => <div className="text-center">الاسم (إنجليزي)</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.en?.name || "-"}
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
            <TableActionMenu items={[{ text: t("details"), href: `/languages/show/${row.original.id}` }]} />
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
