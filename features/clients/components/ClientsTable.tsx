"use client"

import { useState, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"
import { UrlSearchFilter } from "@/components/ui/url-search-filter"
import { UrlFilter } from "@/components/ui/url-filter"
import { ClearFiltersButton } from "@/components/ui/clear-filters-button"

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

import { useClients, useToggleActivateClient } from "@/features/clients/hooks"
import { Client } from "@/features/clients/types"
import Image from "next/image"

export function ClientsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const filters = {
    keyword: searchParams.get("keyword"),
    status: searchParams.get("status"),
  }
  const { data, isLoading } = useClients(page, filters)
  
  const { mutate: toggleActivate, isPending: isToggling } = useToggleActivateClient()
  const [toggleActivateId, setToggleActivateId] = useState<string | null>(null)

  // Using Umrahs translations for common table columns since they are already defined there
  const t = useTranslations("Umrahs")
  const tCommon = useTranslations("Common")
  const tClients = useTranslations("Clients")
  const tAuth = useTranslations("Auth")

  const columns = useMemo<ColumnDef<Client>[]>(() => [
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
      size: 250,
      cell: ({ row }) => {
        const client = row.original
        const name = client.name || t("no_name")
        const image = client.image

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
      id: "email",
      header: () => <div className="text-center">{tAuth("email")}</div>,
      size: 200,
      cell: ({ row }) => {
        return (
          <div className="text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {row.original.email || "-"}
          </div>
        )
      }
    },
    {
      id: "phone",
      header: () => <div className="text-center">{t("phone")}</div>,
      size: 140,
      cell: ({ row }) => {
        const phone = row.original.phone
        const code = row.original.phone_code
        return (
          <div className="text-center text-zinc-900 font-bold dark:text-zinc-100" dir="ltr">
            {phone ? `+${code} ${phone}` : "-"}
          </div>
        )
      }
    },

    {
      id: "gender",
      header: () => <div className="text-center">{tClients("gender")}</div>,
      size: 100,
      cell: ({ row }) => {
        const gender = row.original.gender
        return (
          <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
            {gender === 'male' ? tClients("male") : gender === 'female' ? tClients("female") : "-"}
          </div>
        )
      }
    },
    {
      id: "country",
      header: () => <div className="text-center">{tCommon("country")}</div>,
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
      id: "is_active",
      header: () => <div className="text-center">{tClients("active")}</div>,
      size: 140,
      cell: ({ row }) => {
        const isActive = !!row.original.is_active
        return (
          <div className="flex items-center justify-center">
            <FakeSwitch checked={isActive} onChange={() => setToggleActivateId(String(row.original.id))} />
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
            <TableActionMenu items={[{ text: t("details"), href: `/clients/show/${row.original.id}` }]} />
          </div>
        )
      },
    },
  ], [t, tCommon, tClients, tAuth, router, page, data?.meta?.per_page])

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="w-full relative">
      <DataTable
        columns={columns}
        data={data?.data || []}
        topContent={
          <div className="flex flex-wrap items-center gap-3 w-full bg-white dark:bg-zinc-900/50 p-4 rounded-2xl mb-4">
            <UrlSearchFilter 
              filterKey="keyword" 
              placeholder={tCommon("search_placeholder")}
              buttonText={tCommon("apply")}
            />
            <UrlFilter
              filterKey="status"
              placeholder={tClients("status_filter_placeholder")}
              options={[
                { value: "active", label: tClients("active") },
                { value: "inactive", label: tClients("inactive") },
                { value: "most_demanding", label: tClients("most_demanding") },
              ]}
            />
            <ClearFiltersButton label={tCommon("clear_filters")} />
          </div>
        }
        bottomContent={<UrlPagination pageCount={data?.meta?.last_page || 1} />}
      />

      <ConfirmDialog
        isOpen={!!toggleActivateId}
        onClose={() => setToggleActivateId(null)}
        onConfirm={() => {
          if (toggleActivateId) {
            toggleActivate(toggleActivateId, {
              onSuccess: () => setToggleActivateId(null),
            });
          }
        }}
        isLoading={isToggling}
        title="تأكيد العملية"
        description="هل أنت متأكد أنك تريد تغيير حالة حساب هذا العميل؟"
        confirmButtonColor="bg-primary hover:bg-primary/90"
      />
    </div>
  )
}
