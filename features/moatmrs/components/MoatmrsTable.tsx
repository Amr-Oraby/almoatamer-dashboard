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
import { UrlSearchFilter } from "@/components/ui/url-search-filter"
import { UrlFilter } from "@/components/ui/url-filter"
import { ClearFiltersButton } from "@/components/ui/clear-filters-button"

import { useMoatmrs, useDeleteMoatmr, useToggleAcceptMoatmr } from "@/features/moatmrs/hooks"

import { Moatmr } from "@/features/moatmrs/types"
import Image from "next/image"
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const filters = {
    keyword: searchParams.get("keyword"),
    status: searchParams.get("status"),
  }
  const { data, isLoading } = useMoatmrs(page, filters)
  const { mutate: deleteMoatmr, isPending: isDeleting } = useDeleteMoatmr()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  
  const { mutate: toggleAccept, isPending: isToggling } = useToggleAcceptMoatmr()
  const [toggleAcceptId, setToggleAcceptId] = useState<string | null>(null)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")
  const tCommon = useTranslations("Common")
  const tClients = useTranslations("Clients")
  const tAlmoatamers = useTranslations("Almoatamers")

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
      id: "gender",
      header: () => <div className="text-center">{tClients("gender")}</div>,
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
      id: "is_active",
      header: () => <div className="text-center">{tAlmoatamers("status")}</div>,
      size: 120,
      cell: ({ row }) => {
        const isActive = row.original.is_active
        return (
          <div className="flex items-center justify-center">
            <Badge 
              variant={isActive ? "default" : "secondary"} 
              className={cn(
                "px-2.5 py-0.5 rounded-full text-[11px] font-semibold border-0",
                isActive 
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" 
                  : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
              )}
            >
              {isActive ? tAlmoatamers("active") : tAlmoatamers("inactive")}
            </Badge>
          </div>
        )
      }
    },
    {
      id: "provider_total_orders",
      header: () => <div className="text-center">{tAlmoatamers("total_orders")}</div>,
      size: 100,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.provider_total_orders}
        </div>
      )
    },
    {
      id: "is_available",
      header: () => <div className="text-center">{tAlmoatamers("available")}</div>,
      size: 100,
      cell: ({ row }) => {
        const isAvailable = row.original.is_available === 1
        return (
          <div className="flex items-center justify-center">
            <Badge 
              variant={isAvailable ? "default" : "secondary"} 
              className={cn(
                "px-2.5 py-0.5 rounded-full text-[11px] font-semibold border-0",
                isAvailable 
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" 
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-500/20 dark:text-zinc-400"
              )}
            >
              {isAvailable ? tAlmoatamers("available") : tAlmoatamers("unavailable")}
            </Badge>
          </div>
        )
      }
    },
    {
      id: "accepted_by_admin",
      header: () => <div className="text-center">{tAlmoatamers("accepted")}</div>,
      size: 120,
      cell: ({ row }) => {
        const isAccepted = row.original.accepted_by_admin
        return (
          <div className="flex items-center justify-center">
            <FakeSwitch checked={isAccepted} onChange={() => setToggleAcceptId(String(row.original.id))} />
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
            <TableActionMenu items={[
              { text: t("details") || "التفاصيل", href: `/almoatamers/show/${row.original.id}` },
              { text: "حذف", onClick: () => setDeleteId(String(row.original.id)) }
            ]} />
          </div>
        )
      },
    },
  ], [t, tCommon, tClients, tAlmoatamers, router, page, data?.meta?.per_page])

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
                { value: "most_rated", label: tClients("most_rated") },
              ]}
            />
            <ClearFiltersButton label={tCommon("clear_filters")} />
          </div>
        }
        bottomContent={<UrlPagination pageCount={data?.meta?.last_page || 1} />}
      />

      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteMoatmr(deleteId, {
              onSuccess: () => setDeleteId(null),
            });
          }
        }}
        isDeleting={isDeleting}
      />

      <AlertDialog open={!!toggleAcceptId} onOpenChange={(open) => !open && setToggleAcceptId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد العملية</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد أنك تريد تغيير حالة القبول لهذا المعتمر؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isToggling} onClick={() => setToggleAcceptId(null)}>
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                if (toggleAcceptId) {
                  toggleAccept(toggleAcceptId, {
                    onSuccess: () => setToggleAcceptId(null),
                  });
                }
              }}
              disabled={isToggling}
            >
              {isToggling ? "جاري التحميل..." : "تأكيد"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
