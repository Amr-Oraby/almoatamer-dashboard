"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useCountries } from "@/features/countries/hooks"
import { CountryItem } from "@/features/countries/types"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { TableActionMenu } from "@/components/ui/table-action-menu"

export function CountriesTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useCountries(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<CountryItem>[]>(() => [
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
      id: "code",
      header: () => <div className="text-center">كود الهاتف</div>,
      size: 120,
      cell: ({ row }) => (
        <div className="text-center">
          <Badge variant="outline" className="font-mono text-zinc-600 dark:text-zinc-400" dir="ltr">
            +{row.original.code}
          </Badge>
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
            <TableActionMenu items={[{ text: t("details"), href: `/places/countries/show/${row.original.id}` }]} />
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
