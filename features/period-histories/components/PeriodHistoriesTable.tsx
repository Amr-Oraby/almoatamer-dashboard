"use client"

import { useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns"

import { usePeriodHistories, useDeletePeriodHistory } from "@/features/period-histories/hooks"
import { PeriodHistory } from "@/features/period-histories/types"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { DeleteDialog } from "@/components/ui/delete-dialog";

export function PeriodHistoriesTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = usePeriodHistories(page)
  const { mutate: deletePeriodHistory, isPending: isDeleting } = useDeletePeriodHistory()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  
  const t = useTranslations("Dashboard")
  const tCommon = useTranslations("Common")

  const columns = useMemo<ColumnDef<PeriodHistory>[]>(() => [
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
      id: "from",
      header: () => <div className="text-center">{t("from", { fallback: "From Date" })}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.original.from ? format(new Date(row.original.from), "dd/MM/yyyy") : "-"}
        </div>
      )
    },
    {
      id: "to",
      header: () => <div className="text-center">{t("to", { fallback: "To Date" })}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.original.to ? format(new Date(row.original.to), "dd/MM/yyyy") : "-"}
        </div>
      )
    },
    {
      id: "price",
      header: () => <div className="text-center">{t("price", { fallback: "Price" })}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center font-bold text-emerald-600 dark:text-emerald-400">
          {Number(row.original.price).toFixed(2)}
        </div>
      )
    },
    {
      id: "moatamer_price",
      header: () => <div className="text-center">{t("moatamer_price", { fallback: "Moatamer Price" })}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center font-medium text-zinc-600 dark:text-zinc-300">
          {Number(row.original.moatamer_price).toFixed(2)}
        </div>
      )
    },
    {
      id: "vat",
      header: () => <div className="text-center">{t("vat", { fallback: "VAT" })}</div>,
      size: 100,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.original.vat}%
        </div>
      )
    },
    {
      id: "actions",
      header: () => <div className="text-center">{t("actions", { fallback: "Actions" })}</div>,
      size: 80,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[
              { text: tCommon("delete", { fallback: "Delete" }), onClick: () => setDeleteId(String(row.original.id)) }
            ]} />
          </div>
        )
      },
    },
  ], [t, tCommon, page, data?.meta?.per_page])

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
            deletePeriodHistory(deleteId, {
              onSuccess: () => setDeleteId(null),
            });
          }
        }}
        isDeleting={isDeleting}
      />
    </div>
  )
}
