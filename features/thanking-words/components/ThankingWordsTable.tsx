"use client"

import { useState, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useThankingWords } from "@/features/thanking-words/hooks"
import { ThankingWord } from "@/features/thanking-words/types"
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

export function ThankingWordsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useThankingWords(page)
  
  // Using "Umrahs" namespace for generic keys that we know exist, and hardcoding missing ones gracefully
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<ThankingWord>[]>(() => [
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
      header: t("name"),
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
      id: "text",
      header: () => <div className="text-center">النص</div>,
      size: 300,
      cell: ({ row }) => (
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-[300px]" title={row.original.text}>
          {row.original.text}
        </div>
      )
    },
    {
      id: "date",
      header: () => <div className="text-center">التاريخ</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.date}
        </div>
      )
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
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 outline-none">
                <MoreVertical className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-xl">
                <DropdownMenuItem
                  onClick={() => router.push(`/ui-management/thanking-word/show/${row.original.id}`)}
                  className="cursor-pointer font-bold text-zinc-700 dark:text-zinc-300 justify-end"
                >
                  {t("details")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
