"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useWithdrawalRequests } from "@/features/withdrawal-requests/hooks"
import { WithdrawalRequestItem } from "@/features/withdrawal-requests/types"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function WithdrawalRequestsTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useWithdrawalRequests(page)

  const columns = useMemo<ColumnDef<WithdrawalRequestItem>[]>(() => [
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
      id: "user",
      header: () => <div className="text-center">المستخدم</div>,
      size: 250,
      cell: ({ row }) => {
        const user = row.original.user
        if (!user) return <div className="text-center text-zinc-500">-</div>

        return (
          <div className="flex items-center justify-start gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 relative">
              {user.image ? (
                <Image src={user.image} alt={user.name} fill className="object-cover" unoptimized />
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold">{user.name.substring(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{user.name}</span>
              <span className="text-xs text-zinc-500">{user.phone}</span>
            </div>
          </div>
        )
      }
    },
    {
      id: "amount",
      header: () => <div className="text-center">المبلغ المطلوب</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center">
          <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">
            {row.original.amount} ر.س
          </span>
        </div>
      )
    },
    {
      id: "bank_info",
      header: () => <div className="text-center">معلومات البنك</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{row.original.bank_name || "-"}</span>
          <span className="text-xs text-zinc-500 font-medium" dir="ltr">{row.original.account_number || "-"}</span>
        </div>
      )
    },
    {
      id: "status",
      header: () => <div className="text-center">الحالة</div>,
      size: 120,
      cell: ({ row }) => {
        const status = row.original.status
        let variant: "default" | "secondary" | "destructive" | "outline" = "outline"
        let label = status

        if (status === "pending") {
          variant = "secondary"
          label = "قيد الانتظار"
        } else if (status === "accepted") {
          variant = "default"
          label = "مقبول"
        } else if (status === "rejected") {
          variant = "destructive"
          label = "مرفوض"
        }

        return (
          <div className="flex items-center justify-center">
            <Badge variant={variant} className="px-3 py-1 text-xs">
              {label}
            </Badge>
          </div>
        )
      }
    },
    {
      id: "date",
      header: () => <div className="text-center">التاريخ</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center">
          <span className="text-sm text-zinc-600 dark:text-zinc-400 text-center" dir="ltr">
            {row.original.created_at}
          </span>
          {row.original.acceptance_rejection_action && (
            <span className="text-[10px] text-zinc-400" dir="ltr">
              الإجراء: {row.original.acceptance_rejection_action}
            </span>
          )}
        </div>
      )
    },
  ], [page, data?.meta?.per_page])

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
