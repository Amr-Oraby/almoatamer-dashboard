"use client"

import { useState, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useHomeBanners } from "@/features/home-banners/hooks"
import { HomeBanner } from "@/features/home-banners/types"
import Image from "next/image"

const FakeSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
  <button
    onClick={onChange}
    className={cn(
      "w-11 h-6 rounded-full flex items-center px-1 transition-colors outline-none",
      checked ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-800"
    )}
  >
    <div className={cn(
      "w-4 h-4 rounded-full bg-white transition-transform shadow-sm",
      checked ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0"
    )} />
  </button>
)

export function HomeBannersTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useHomeBanners(page)
  
  // Using "Umrahs" namespace for generic keys that exist, hardcoding specific ones gracefully
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<HomeBanner>[]>(() => [
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
      id: "image",
      header: () => <div className="text-center">الصورة</div>,
      size: 400,
      cell: ({ row }) => {
        const image = row.original.image
        return (
          <div className="flex items-center justify-center">
            <div className="w-40 h-20 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm relative">
              {image ? (
                <Image src={image} alt="Banner" fill className="object-cover" unoptimized />
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold">بدون صورة</span>
              )}
            </div>
          </div>
        )
      },
    },
    {
      id: "isBlocked",
      header: () => <div className="text-center">{t("block")}</div>,
      size: 140,
      cell: function Cell({ row }) {
        const [isBlocked, setIsBlocked] = useState(!row.original.is_active)
        return (
          <div className="flex items-center justify-center">
            <FakeSwitch checked={isBlocked} onChange={() => setIsBlocked(!isBlocked)} />
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">{t("actions")}</div>,
      size: 130,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[{ text: t("details"), href: `/ui-management/gallery/show/${row.original.id}` }]} />
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
