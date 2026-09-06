"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import {  Copy, ExternalLink } from "lucide-react"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { useReferralLinks } from "@/features/referral-links/hooks"
import { ReferralLink } from "@/features/referral-links/types"

export function ReferralLinksTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useReferralLinks(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("تم نسخ الرابط بنجاح")
  }

  const columns = useMemo<ColumnDef<ReferralLink>[]>(() => [
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
      id: "marketer",
      header: () => <div className="text-center">المسوق</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="font-bold text-zinc-900 dark:text-zinc-100 text-center">
          {row.original.marketer || "-"}
        </div>
      ),
    },
    {
      id: "city",
      header: () => <div className="text-center">المدينة</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {row.original.city?.name || "-"}
        </div>
      )
    },
    {
      id: "type_value",
      header: () => <div className="text-center">النوع / القيمة</div>,
      size: 150,
      cell: ({ row }) => {
        const { type, value } = row.original
        const typeText = type === "percentage" ? "نسبة" : "مبلغ ثابت"
        const valueText = type === "percentage" ? `${value}%` : value
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{valueText}</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{typeText}</span>
          </div>
        )
      }
    },
    {
      id: "total",
      header: () => <div className="text-center">الإجمالي</div>,
      size: 120,
      cell: ({ row }) => (
        <div className="text-center text-sm font-bold text-primary">
          {row.original.total}
        </div>
      )
    },
    {
      id: "link",
      header: () => <div className="text-center">الرابط</div>,
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button 
            onClick={() => copyToClipboard(row.original.link)}
            className="p-2 text-zinc-400 hover:text-primary transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 outline-none"
            title="نسخ الرابط"
          >
            <Copy className="w-4 h-4" />
          </button>
          <a 
            href={row.original.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-blue-500 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 outline-none"
            title="فتح الرابط"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )
    },
    {
      id: "actions",
      header: () => <div className="text-center">{t("actions")}</div>,
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[{ text: t("details"), href: `/referral-links/show/${row.original.id}` }]} />
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
