"use client"

import { useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"


import { useReportReasons, useDeleteReportReason } from "@/features/report-reason/hooks"
import { ReportReasonItem } from "@/features/report-reason/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageSquareWarning, Languages, Type, Calendar, Clock } from "lucide-react"
import { DeleteDialog } from "@/components/ui/delete-dialog";

export function ReportReasonsTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const locale = useLocale()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useReportReasons(page)
  const { mutate: deleteReportReason, isPending: isDeleting } = useDeleteReportReason()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  
  const [selectedReportReason, setSelectedReportReason] = useState<ReportReasonItem | null>(null)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")
  const tCommon = useTranslations("Common")

  const columns = useMemo<ColumnDef<ReportReasonItem>[]>(() => [
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
      id: "name_ar",
      header: () => <div className="text-center">{tCommon("reason_ar", { fallback: "السبب (عربي)" })}</div>,
      size: 300,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.ar?.name || "-"}
        </div>
      )
    },
    {
      id: "name_en",
      header: () => <div className="text-center">{tCommon("reason_en", { fallback: "السبب (إنجليزي)" })}</div>,
      size: 300,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.en?.name || "-"}
        </div>
      )
    },
    {
      id: "actions",
      header: () => <div className="text-center">{tCommon("actions", { fallback: "Actions" })}</div>,
      size: 80,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[
              { text: tCommon("details", { fallback: "Details" }), onClick: () => setSelectedReportReason(row.original), permission: "show-report-reason" },
              { text: tCommon("edit", { fallback: "Edit" }), href: `/report-reason/update/${row.original.id}`, permission: "update-report-reason" },
              { text: tCommon("delete", { fallback: "Delete" }), onClick: () => setDeleteId(String(row.original.id)), permission: "delete-report-reason", isDestructive: true }
            ]} />
          </div>
        )
      },
    },
  ], [t, tCommon, router, page, data?.meta?.per_page])

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

      <Dialog open={!!selectedReportReason} onOpenChange={(open) => !open && setSelectedReportReason(null)}>
        <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
              <MessageSquareWarning className="w-6 h-6 text-primary" />
              {tCommon("report_reason_details", { fallback: "Report Reason Details" })}
            </DialogTitle>
          </DialogHeader>

          {selectedReportReason && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { lang: "ar", label: tCommon("arabic", { fallback: "العربية" }), data: selectedReportReason.ar },
                  { lang: "en", label: tCommon("english", { fallback: "English" }), data: selectedReportReason.en },
                ].map((item) => (
                  <div key={item.lang} className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden flex flex-col">
                    <div className="bg-zinc-100/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800 p-3 flex items-center justify-between">
                      <span className="text-sm font-bold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                        <Languages className="w-4 h-4 text-primary" />
                        {item.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-zinc-400 uppercase">{item.lang}</span>
                    </div>
                    <div className="p-4 flex-1">
                      <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 mb-1.5">
                        <Type className="w-3 h-3" />
                        {tCommon("reason_text", { fallback: "Reason text" })}
                      </span>
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-4">
                        {item.data?.name || <span className="text-zinc-400 font-normal">-</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {tCommon("created_at", { fallback: "Created At" })}
                    </span>
                    <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
                        {selectedReportReason.created_at ? new Date(selectedReportReason.created_at).toLocaleString() : "-"}
                    </span>
                </div>
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {tCommon("updated_at", { fallback: "Updated At" })}
                    </span>
                    <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
                        {selectedReportReason.updated_at ? new Date(selectedReportReason.updated_at).toLocaleString() : "-"}
                    </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteReportReason(deleteId, {
              onSuccess: () => setDeleteId(null),
            });
          }
        }}
        isDeleting={isDeleting}
      />
    </div>
  )
}
