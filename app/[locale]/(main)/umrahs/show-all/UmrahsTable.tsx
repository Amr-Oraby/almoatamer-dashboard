"use client"

import { useState, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, MoreVertical, ChevronDown } from "lucide-react"

import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

// Fake Switch to match the UI visual exactly
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

import { useUmrahs } from "@/features/umrahs/hooks"
import { Umrah } from "@/features/umrahs/types"
import Image from "next/image"

export function UmrahsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading, isError } = useUmrahs(page)
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<Umrah>[]>(() => [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => <div className="font-medium text-zinc-900 dark:text-zinc-100 px-2">{row.getValue("id")}</div>,
    },
    {
      id: "client_name",
      header: t("name"),
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
              <span className="text-xs text-zinc-500">{row.original.name || t("not_found")}</span>
            </div>
          </div>
        )
      },
    },
    {
      id: "phone",
      header: () => <div className="text-center">{t("phone")}</div>,
      cell: ({ row }) => {
        const phone = row.original.phone || row.original.client?.phone
        const code = row.original.phone_code || row.original.client?.phone_code
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
      cell: ({ row }) => <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">{row.original.total_price} SAR</div>,
    },
    {
      accessorKey: "umrah_status",
      header: () => <div className="text-center">{t("status")}</div>,
      cell: ({ row }) => {
        const status = row.original.umrah_status
        return (
          <div className={`text-center font-bold ${
            status === 'done' ? 'text-green-600 dark:text-green-400' :
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
      id: "isBlocked",
      header: () => <div className="text-center">{t("block")}</div>,
      cell: function Cell({ row }) {
        const [isBlocked, setIsBlocked] = useState(!row.original.client?.is_active)
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
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 outline-none">
                <MoreVertical className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-xl">
                <DropdownMenuItem 
                  onClick={() => router.push(`/umrahs/show/${row.original.id}`)}
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
  ], [t])

  const topContent = (
    <>
      {/* Right side (RTL start) -> Add Button */}
      <div className="flex items-center gap-3 order-1 rtl:order-2">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-bold px-6 py-6 rounded-xl shadow-sm text-base">
          <Plus className="w-5 h-5" />
          <span>{t("add_umrah")}</span>
        </Button>
      </div>

      {/* Left side (RTL end) -> Dropdowns */}
      <div className="flex items-center gap-3 order-2 rtl:order-1 ml-auto rtl:mr-auto rtl:ml-0">
        <div className="relative">
          <select className="appearance-none bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-xl py-3 ps-5 pe-10 outline-none focus:ring-2 focus:ring-primary/20 font-medium cursor-pointer min-w-[180px]">
            <option>{t("user_type")}</option>
            <option>{t("vip")}</option>
            <option>{t("economy")}</option>
          </select>
          <ChevronDown className="w-4 h-4 text-zinc-500 absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </>
  )

  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-zinc-950/50 rounded-2xl">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <DataTable 
        columns={columns} 
        data={data?.data || []} 
        topContent={topContent}
        bottomContent={<UrlPagination pageCount={data?.meta?.last_page || 1} />}
      />
    </div>
  )
}
