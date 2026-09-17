"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"

import { useUmrahMoatmers } from "@/features/umrahs/hooks"
import { UmrahMoatmer } from "@/features/umrahs/types"
import Image from "next/image"
import { UrlPagination } from "@/components/ui/url-pagination"
import { TableSkeleton } from "@/components/ui/table-skeleton"

export function UmrahMoatmersTable({ umrahId }: { umrahId: string }) {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useUmrahMoatmers(umrahId, page)

  const t = useTranslations("Almoatamers")
  const tCommon = useTranslations("Common")
  const tUmrahs = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<UmrahMoatmer>[]>(() => [
    {
      id: "index",
      header: "#",
      size: 60,
      cell: ({ row }) => {
        const index = (page - 1) * (data?.meta?.per_page || 10) + row.index + 1;
        return <div className="font-medium text-zinc-900 dark:text-zinc-100 px-2">{index}</div>;
      }
    },
    {
      id: "image",
      header: () => <div className="text-center">{tCommon("image")}</div>,
      size: 80,
      cell: ({ row }) => {
        const image = row.original.image;
        return (
          <div className="flex justify-center">
            {image ? (
              <Image src={image} alt={row.original.name} width={40} height={40} className="rounded-full object-cover w-10 h-10 border border-zinc-200 dark:border-zinc-800" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs border border-zinc-200 dark:border-zinc-800">
                {row.original.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        )
      }
    },
    {
      id: "name",
      header: () => <div className="text-right">{tCommon("name")}</div>,
      cell: ({ row }) => <div className="font-semibold text-zinc-900 dark:text-zinc-100">{row.original.name}</div>
    },
    {
      id: "contact",
      header: () => <div className="text-right">{tCommon("contact")}</div>,
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <div className="text-sm text-zinc-600 dark:text-zinc-400" dir="ltr">
            {row.original.phone ? `+${row.original.phone_code} ${row.original.phone}` : "-"}
          </div>
          <div className="text-xs text-zinc-500">{row.original.email || "-"}</div>
        </div>
      )
    },
    {
      id: "wallet_balance",
      header: () => <div className="text-center">{t("wallet_balance")}</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium text-primary">
          {row.original.wallet_balance} SAR
        </div>
      )
    }
  ], [page, data, t, tCommon])

  const pagination = data?.meta ? (
    <UrlPagination pageCount={data.meta.last_page || 1} />
  ) : null

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{tUmrahs("moatmers")}</h2>
      </div>
      <DataTable
        columns={columns}
        data={data?.data || []}
        bottomContent={pagination}
      />
    </div>
  )
}
