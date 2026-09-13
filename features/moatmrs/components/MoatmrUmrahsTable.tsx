"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"
import { useMoatmrUmrahs } from "@/features/moatmrs/hooks"
import { Umrah } from "@/features/umrahs/types"
import Image from "next/image"

export function MoatmrUmrahsTable({ moatmerId }: { moatmerId: string }) {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  
  const { data, isLoading } = useMoatmrUmrahs(moatmerId, page)
  const t = useTranslations("Umrahs")
  const tDashboard = useTranslations("Dashboard")

  const columns = useMemo<ColumnDef<Umrah>[]>(() => [
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
      id: "client_name",
      header: t("name"),
      size: 200,
      cell: ({ row }) => {
        const client = row.original.client
        const name = client?.name || t("no_name")
        const image = client?.image

        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm relative">
              {image ? (
                <Image src={image} alt={name} fill className="object-cover" unoptimized />
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold">{name.substring(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{name}</span>
            </div>
          </div>
        )
      },
    },
    {
      id: "phone",
      header: () => <div className="text-center">{t("phone")}</div>,
      size: 140,
      cell: ({ row }) => {
        const phone = row.original.client?.phone
        const code = row.original.client?.phone_code
        return (
          <div className="text-center text-zinc-900 font-bold dark:text-zinc-100" dir="ltr">
            {phone ? `+${code} ${phone}` : "-"}
          </div>
        )
      }
    },
    {
      accessorKey: "price",
      header: () => <div className="text-center">{t("price_type")}</div>,
      size: 100,
      cell: ({ row }) => <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">{row.original.total_price} SAR</div>,
    },
    {
      accessorKey: "umrah_status",
      header: () => <div className="text-center">{t("status")}</div>,
      size: 100,
      cell: ({ row }) => {
        const status = row.original.umrah_status
        return (
          <div className={`text-center font-bold ${status === 'done' ? 'text-green-600 dark:text-green-400' :
            status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
              'text-blue-600 dark:text-blue-400'
            }`}>
            {status === 'done' ? t("completed") :
              status === 'pending' ? t("pending") : status}
          </div>
        )
      },
    },
    {
      id: "is_paid",
      header: () => <div className="text-center">{t("payment_status")}</div>,
      size: 140,
      cell: ({ row }) => {
        const isPaid = row.original.is_paid
        return (
          <div className="flex items-center justify-center">
            <div className={`font-bold ${isPaid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isPaid ? t("paid") : t("unpaid")}
            </div>
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">{t("actions")}</div>,
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[{ text: t("details"), href: `/umrahs/show/${row.original.id}`, permission: "show-umrahs" }]} />
          </div>
        )
      },
    },
  ], [t, data?.meta?.per_page, page])

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="w-full relative mt-6">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">{tDashboard("umrahs_menu")}</h2>
      <DataTable
        columns={columns}
        data={data?.data || []}
        bottomContent={<UrlPagination pageCount={data?.meta?.last_page || 1} />}
      />
    </div>
  )
}
