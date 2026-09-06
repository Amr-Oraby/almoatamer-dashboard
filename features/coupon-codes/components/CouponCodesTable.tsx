"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useCouponCodes } from "@/features/coupon-codes/hooks"
import { CouponCodeGroup } from "@/features/coupon-codes/types"

export function CouponCodesTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useCouponCodes(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<CouponCodeGroup>[]>(() => [
    {
      id: "index",
      header: "#",
      size: 60,
      cell: ({ row }) => {
        const index = (page - 1) * (data?.meta?.per_page || 15) + row.index + 1;
        return <div className="font-medium text-zinc-900 dark:text-zinc-100 px-2">{index}</div>;
      },
    },
    {
      id: "sender_name",
      header: () => <div className="text-center">المرسل (المسوق)</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.sender.name || "-"}
        </div>
      )
    },
    {
      id: "sender_phone",
      header: () => <div className="text-center">رقم الهاتف</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center font-medium text-zinc-600 dark:text-zinc-400" dir="ltr">
          {row.original.sender.phone || "-"}
        </div>
      )
    },
    {
      id: "codes_count",
      header: () => <div className="text-center">عدد الأكواد</div>,
      size: 150,
      cell: ({ row }) => {
        const count = row.original.sender.codes?.length || 0;
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">
              {count}
            </span>
            <span className="text-[10px] text-zinc-500">كود</span>
          </div>
        )
      }
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
