"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { WithdrawalRequestItem } from "@/features/withdrawal-requests/types"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"

interface FinancialWithdrawalRequestsTableProps {
  data: WithdrawalRequestItem[]
}

export function FinancialWithdrawalRequestsTable({ data }: FinancialWithdrawalRequestsTableProps) {
  const t = useTranslations("WithdrawalRequests")

  const columns = useMemo<ColumnDef<WithdrawalRequestItem>[]>(() => [
    {
      id: "index",
      header: "#",
      size: 60,
      cell: ({ row }) => {
        return <div className="font-medium text-zinc-900 dark:text-zinc-100 px-2">{row.index + 1}</div>;
      },
    },
    {
      id: "user",
      header: () => <div className="text-center">{t("user_info")}</div>,
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
      header: () => <div className="text-center">{t("amount")}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center">
          <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">
            {row.original.amount}
          </span>
        </div>
      )
    },
    {
      id: "bank_info",
      header: () => <div className="text-center">{t("bank_info")}</div>,
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
      header: () => <div className="text-center">{t("status")}</div>,
      size: 120,
      cell: ({ row }) => {
        const status = row.original.status
        let variant: "default" | "secondary" | "destructive" | "outline" = "outline"
        let label = status

        if (status === "pending") {
          variant = "secondary"
        } else if (status === "confirmed" || status === "accepted") {
          variant = "default"
        } else if (status === "rejected") {
          variant = "destructive"
        }

        return (
          <div className="flex items-center justify-center">
            <Badge variant={variant} className="px-3 py-1 text-xs uppercase">
              {label}
            </Badge>
          </div>
        )
      }
    },
    {
      id: "date",
      header: () => <div className="text-center">{t("created_at")}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center">
          <span className="text-sm text-zinc-600 dark:text-zinc-400 text-center" dir="ltr">
            {row.original.created_at}
          </span>
        </div>
      )
    }
  ], [t])

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  )
}
