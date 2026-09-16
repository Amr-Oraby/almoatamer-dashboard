"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns"

import { useDeletionAudits } from "@/features/deletion-audits/hooks"
import { DeletionAudit } from "@/features/deletion-audits/types"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { Badge } from "@/components/ui/badge"

export function DeletionAuditsTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useDeletionAudits(page)
  
  const t = useTranslations("Dashboard")

  const columns = useMemo<ColumnDef<DeletionAudit>[]>(() => [
    {
      id: "index",
      header: "#",
      size: 60,
      cell: ({ row }) => {
        const index = (page - 1) * (data?.data?.per_page || 15) + row.index + 1;
        return <div className="font-medium text-zinc-900 dark:text-zinc-100 px-2">{index}</div>;
      },
    },
    {
      id: "deleted_user",
      header: () => <div className="text-center">{t("deleted_user", { fallback: "Deleted User" })}</div>,
      size: 250,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{row.original.deleted_user_name || "-"}</span>
          <span className="text-sm text-zinc-500">{row.original.deleted_user_email || row.original.deleted_user_phone}</span>
        </div>
      )
    },
    {
      id: "deletion_type",
      header: () => <div className="text-center">{t("deletion_type", { fallback: "Deletion Type" })}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Badge variant="outline" className="text-xs bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400 border-red-200 dark:border-red-900">
            {row.original.deletion_type}
          </Badge>
        </div>
      )
    },
    {
      id: "triggered_by",
      header: () => <div className="text-center">{t("triggered_by", { fallback: "Triggered By" })}</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-medium">{row.original.triggered_by_user_name || "-"}</span>
          <span className="text-xs text-zinc-500">{row.original.triggered_by_user_role}</span>
        </div>
      )
    },
    {
      id: "deleted_at",
      header: () => <div className="text-center">{t("deletion_date", { fallback: "Deletion Date" })}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.original.deleted_at ? format(new Date(row.original.deleted_at), "dd/MM/yyyy HH:mm") : "-"}
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
              { text: t("details", { fallback: "Details" }), href: `/deletion-audits/show/${row.original.id}` }
            ]} />
          </div>
        )
      },
    },
  ], [t, page, data?.data?.per_page])

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="w-full relative">
      <DataTable
        columns={columns}
        data={data?.data?.data || []}
        bottomContent={<UrlPagination pageCount={data?.data?.last_page || 1} />}
      />
    </div>
  )
}
