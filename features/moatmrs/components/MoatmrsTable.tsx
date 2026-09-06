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

import { useMoatmrs } from "@/features/moatmrs/hooks"
import { Moatmr } from "@/features/moatmrs/types"
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

export function MoatmrsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useMoatmrs(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<Moatmr>[]>(() => [
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
      id: "name",
      header: t("name") || "الاسم",
      size: 250,
      cell: ({ row }) => {
        const person = row.original
        const name = person.name || "بدون اسم"
        const image = person.image

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
      id: "contact",
      header: () => <div className="text-center">{t("phone")}</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100" dir="ltr">
            +{row.original.phone_code} {row.original.phone}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {row.original.email}
          </span>
        </div>
      ),
    },
    {
      id: "country",
      header: () => <div className="text-center">الدولة</div>,
      size: 150,
      cell: ({ row }) => {
        const country = row.original.country
        return (
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {country?.name || "-"}
            </span>
          </div>
        )
      }
    },
    {
      id: "gender",
      header: () => <div className="text-center">الجنس</div>,
      size: 100,
      cell: ({ row }) => {
        const gender = row.original.gender
        return (
          <div className="text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {gender === "male" ? "ذكر" : gender === "female" ? "أنثى" : "-"}
          </div>
        )
      }
    },
    {
      id: "isBlocked",
      header: () => <div className="text-center">{t("block")}</div>,
      size: 120,
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
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[{ text: t("details"), href: `/almoatamers/show/${row.original.id}` }]} />
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
