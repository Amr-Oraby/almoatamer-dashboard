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

import { useCoupons } from "@/features/coupons/hooks"
import { CouponItem } from "@/features/coupons/types"
import { Badge } from "@/components/ui/badge"

export function CouponsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useCoupons(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<CouponItem>[]>(() => [
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
      id: "code",
      header: () => <div className="text-center">الكود</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center font-bold tracking-widest text-primary font-mono">
          {row.original.code}
        </div>
      )
    },
    {
      id: "discount",
      header: () => <div className="text-center">قيمة الخصم</div>,
      size: 150,
      cell: ({ row }) => {
        const { type, discount_amount } = row.original
        const valueText = type === "percentage" ? `${discount_amount}%` : `${discount_amount} ر.س`
        const typeText = type === "percentage" ? "نسبة مئوية" : "مبلغ ثابت"
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">{valueText}</span>
            <span className="text-[10px] text-zinc-500">{typeText}</span>
          </div>
        )
      }
    },
    {
      id: "usage",
      header: () => <div className="text-center">الاستخدام</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center">
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            {row.original.times_used} / {row.original.usage_limit}
          </span>
          <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-1 overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${Math.min(100, (row.original.times_used / row.original.usage_limit) * 100)}%` }}
            />
          </div>
        </div>
      )
    },
    {
      id: "dates",
      header: () => <div className="text-center">فترة الصلاحية</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 w-10 text-right">من:</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100" dir="ltr">{row.original.start_date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 w-10 text-right">إلى:</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100" dir="ltr">{row.original.expiry_date}</span>
          </div>
        </div>
      )
    },
    {
      id: "status",
      header: () => <div className="text-center">الحالة</div>,
      size: 100,
      cell: ({ row }) => {
        const isActive = row.original.status
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
            <TableActionMenu items={[{ text: t("details"), href: `/discounts/coupons/show/${row.original.id}` }]} />
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
