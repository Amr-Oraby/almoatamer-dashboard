"use client"

import { useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"
import { UrlSearchFilter } from "@/components/ui/url-search-filter"
import { ClearFiltersButton } from "@/components/ui/clear-filters-button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useAdmins, useDeleteAdmin } from "@/features/admins/hooks"
import { AdminItem } from "@/features/admins/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { Mail, Phone } from "lucide-react"

export function AdminsTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const filters = {
    keyword: searchParams.get("keyword"),
  }
  const { data, isLoading } = useAdmins(page, filters)
  const { mutate: deleteAdmin, isPending: isDeleting } = useDeleteAdmin()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")
  const tCommon = useTranslations("Common")

  const columns = useMemo<ColumnDef<AdminItem>[]>(() => [
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
      id: "admin",
      header: () => <div className="text-right">المشرف</div>,
      size: 300,
      cell: ({ row }) => {
        const admin = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-zinc-200 dark:border-zinc-800">
              <AvatarImage src={admin.image} alt={admin.name} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {admin.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{admin.name}</span>
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <Mail className="w-3 h-3" />
                <span>{admin.email}</span>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      id: "phone",
      header: () => <div className="text-center">رقم الهاتف</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1 text-zinc-600 dark:text-zinc-400 font-mono" dir="ltr">
          <Phone className="w-3 h-3 opacity-50" />
          <span>+{row.original.phone_code} {row.original.phone}</span>
        </div>
      )
    },
    {
      id: "role",
      header: () => <div className="text-center">الدور (Role)</div>,
      size: 150,
      cell: ({ row }) => {
        const roleName = row.original.role?.ar?.name || "مدير النظام (Super Admin)"
        return (
          <div className="text-center">
            <Badge variant="outline" className="font-bold text-primary border-primary/20 bg-primary/5">
              {roleName}
            </Badge>
          </div>
        )
      }
    },
    {
      id: "is_active",
      header: () => <div className="text-center">الحالة</div>,
      size: 100,
      cell: ({ row }) => {
        const isActive = row.original.is_active
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
            <TableActionMenu items={[
              { text: t("details"), href: `/roles/admins/show/${row.original.id}` },
              { text: "حذف", onClick: () => setDeleteId(String(row.original.id)) }
            ]} />
          </div>
        )
      },
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
        topContent={
          <div className="flex flex-wrap items-center gap-3 w-full bg-white dark:bg-zinc-900/50 p-4 rounded-2xl mb-4">
            <UrlSearchFilter 
              filterKey="keyword" 
              placeholder={tCommon("search_placeholder")}
              buttonText={tCommon("apply")}
            />
            <ClearFiltersButton label={tCommon("clear_filters")} />
          </div>
        }
        bottomContent={<UrlPagination pageCount={data?.meta?.last_page || 1} />}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
            <AlertDialogDescription>
              لا يمكن التراجع عن هذا الإجراء. سيتم حذف المشرف نهائياً.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                if (deleteId) {
                  deleteAdmin(deleteId, {
                    onSuccess: () => setDeleteId(null),
                  })
                }
              }}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white focus:ring-red-500"
            >
              {isDeleting ? "جاري الحذف..." : "تأكيد الحذف"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
