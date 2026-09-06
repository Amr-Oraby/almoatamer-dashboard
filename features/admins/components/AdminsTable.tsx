"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useAdmins } from "@/features/admins/hooks"
import { AdminItem } from "@/features/admins/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { Mail, Phone } from "lucide-react"

export function AdminsTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useAdmins(page)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

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
            <TableActionMenu items={[{ text: t("details"), href: `/roles/admins/show/${row.original.id}` }]} />
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
        bottomContent={<UrlPagination pageCount={data?.meta?.last_page || 1} />}
      />
    </div>
  )
}
