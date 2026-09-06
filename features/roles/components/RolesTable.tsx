"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useRoles } from "@/features/roles/hooks"
import { RoleItem } from "@/features/roles/types"
import { Badge } from "@/components/ui/badge"
import { TableActionMenu } from "@/components/ui/table-action-menu"

export function RolesTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useRoles(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<RoleItem>[]>(() => [
    {
      id: "index",
      header: "#",
      size: 60,
      cell: ({ row }) => {
        const index = (page - 1) * (data?.meta?.per_page || 20) + row.index + 1;
        return <div className="font-medium text-zinc-900 dark:text-zinc-100 px-2">{index}</div>;
      },
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
      id: "permissions",
      header: () => <div className="text-center">الصلاحيات</div>,
      size: 150,
      cell: ({ row }) => {
        const count = row.original.permission?.length || 0;
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">
              {count}
            </span>
            <span className="text-[10px] text-zinc-500">صلاحية</span>
          </div>
        )
      }
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
            <TableActionMenu items={[{ text: t("details"), href: `/roles/show/${row.original.id}` }]} />
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
