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

import { useTransactions } from "@/features/transactions/hooks"
import { TransactionItem } from "@/features/transactions/types"
import Image from "next/image"

export function TransactionsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useTransactions(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<TransactionItem>[]>(() => [
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
      id: "title",
      header: () => <div className="text-center">العملية</div>,
      size: 250,
      cell: ({ row }) => (
        <div className="flex flex-col gap-1 justify-center">
          <span className="font-bold text-zinc-900 dark:text-zinc-100 truncate w-[200px]" title={row.original.title}>
            {row.original.title}
          </span>
          <span className="text-xs text-zinc-500 font-medium">
            رقم العملية: {row.original.transaction_id || "-"}
          </span>
        </div>
      ),
    },
    {
      id: "amount",
      header: () => <div className="text-center">المبلغ</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center">
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {row.original.total} ر.س
          </span>
          <span className="text-xs text-zinc-500">
            السعر: {row.original.price} | الضريبة: {row.original.vat}
          </span>
        </div>
      ),
    },
    {
      id: "user",
      header: () => <div className="text-center">المستخدم</div>,
      size: 200,
      cell: ({ row }) => {
        const user = row.original.user
        if (!user) return <div className="text-center text-zinc-500">-</div>

        return (
          <div className="flex items-center justify-start gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 relative">
              {user.image ? (
                <Image src={user.image} alt={user.name} fill className="object-cover" unoptimized />
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold">{user.name.substring(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.name}</span>
            </div>
          </div>
        )
      }
    },
    {
      id: "moatmer",
      header: () => <div className="text-center">المعتمر</div>,
      size: 200,
      cell: ({ row }) => {
        const moatmer = row.original.moatmer
        if (!moatmer) return <div className="text-center text-zinc-500">-</div>

        return (
          <div className="flex items-center justify-start gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 relative">
              {moatmer.image ? (
                <Image src={moatmer.image} alt={moatmer.name} fill className="object-cover" unoptimized />
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold">{moatmer.name.substring(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{moatmer.name}</span>
            </div>
          </div>
        )
      }
    },
    {
      id: "date",
      header: () => <div className="text-center">التاريخ</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          <span dir="ltr">{row.original.date}</span>
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
            <TableActionMenu items={[{ text: t("details"), href: `/transactions/show/${row.original.id}` }]} />
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
