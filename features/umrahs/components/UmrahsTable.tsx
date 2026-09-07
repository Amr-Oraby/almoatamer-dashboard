"use client"

import { useState, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import {  ChevronDown } from "lucide-react"

import { UrlPagination } from "@/components/ui/url-pagination"
import { UrlFilter } from "@/components/ui/url-filter"
import { UrlDateFilter } from "@/components/ui/url-date-filter"
import { ClearFiltersButton } from "@/components/ui/clear-filters-button"
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
import { useClientsWithoutPagination } from "@/features/clients/hooks"
import { useMoatmrsWithoutPagination } from "@/features/moatmrs/hooks"
import Image from "next/image"

export function UmrahsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const filters = {
    is_paid: searchParams.get("is_paid"),
    keyword: searchParams.get("status"),
    umrah_date_from: searchParams.get("umrah_date_from"),
    umrah_date_to: searchParams.get("umrah_date_to"),
    order_date_from: searchParams.get("order_date_from"),
    order_date_to: searchParams.get("order_date_to"),
    client_id: searchParams.get("client_id"),
    provider_id: searchParams.get("provider_id"),
  }
  const { data, isLoading } = useUmrahs(page, filters)
  
  const { data: clientsData, isLoading: isLoadingClients } = useClientsWithoutPagination()
  const { data: moatmrsData, isLoading: isLoadingMoatmrs } = useMoatmrsWithoutPagination()
  
  const clientOptions = clientsData?.data?.map((c: any) => ({ label: c.name, value: c.id.toString() })) || []
  const providerOptions = moatmrsData?.data?.map((m: any) => ({ label: m.name, value: m.id.toString() })) || []

  const t = useTranslations("Umrahs")
  const tCommon = useTranslations("Common")

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
      size: 250,
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
      size: 140,
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
      size: 150,
      cell: ({ row }) => <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">{row.original.total_price} SAR</div>,
    },
    {
      accessorKey: "umrah_status",
      header: () => <div className="text-center">{t("status")}</div>,
      size: 150,
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
      size: 130,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[{ text: t("details"), href: `/umrahs/show/${row.original.id}` }]} />
          </div>
        )
      },
    },
  ], [t])

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="w-full relative">
      <DataTable
        columns={columns}
        data={data?.data || []}
        topContent={
          <div className="flex flex-wrap items-end gap-4 w-full">
            <div className="flex flex-wrap items-center gap-4">
              <UrlFilter
                filterKey="client_id"
                placeholder={t("client")}
                options={clientOptions}
                isLoading={isLoadingClients}
              />
              <UrlFilter
                filterKey="provider_id"
                placeholder={t("provider")}
                options={providerOptions}
                isLoading={isLoadingMoatmrs}
              />
              <UrlFilter
                filterKey="is_paid"
                placeholder={t("payment_status")}
                options={[
                  { label: t("paid"), value: "1" },
                  { label: t("unpaid"), value: "0" }
                ]}
              />
              <UrlFilter
                filterKey="status"
                placeholder={t("status")}
                options={[
                  { label: t("pending"), value: "pending" },
                  { label: t("running"), value: "running" },
                  { label: t("completed"), value: "done" },
                  { label: t("canceled"), value: "canceled" }
                ]}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 ml-auto rtl:mr-auto rtl:ml-0">
              <UrlDateFilter filterKey="umrah_date_from" label={t("umrah_date_from")} />
              <UrlDateFilter filterKey="umrah_date_to" label={t("umrah_date_to")} />
              <UrlDateFilter filterKey="order_date_from" label={t("order_date_from")} />
              <UrlDateFilter filterKey="order_date_to" label={t("order_date_to")} />
              
              <ClearFiltersButton label={tCommon("clear_filters")} />
            </div>
          </div>
        }
        bottomContent={<UrlPagination pageCount={data?.meta?.last_page || 1} />}
      />
    </div>
  )
}
