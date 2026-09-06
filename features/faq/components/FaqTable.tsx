"use client"

import { useState, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Languages, Type, AlignLeft } from "lucide-react"

import { useFaqs } from "@/features/faq/hooks"
import { FaqItem } from "@/features/faq/types"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { HelpCircle } from "lucide-react"

export function FaqTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useFaqs(page)
  
  const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<FaqItem>[]>(() => [
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
      id: "question_ar",
      header: () => <div className="text-right">السؤال (عربي)</div>,
      size: 250,
      cell: ({ row }) => (
        <div className="flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2" title={row.original.ar?.question || ""}>
              {row.original.ar?.question || "-"}
            </span>
            <span className="text-sm text-zinc-500 line-clamp-1 mt-1" title={row.original.ar?.answer || ""}>
              {row.original.ar?.answer || "-"}
            </span>
          </div>
        </div>
      )
    },
    {
      id: "question_en",
      header: () => <div className="text-left" dir="ltr">Question (English)</div>,
      size: 250,
      cell: ({ row }) => (
        <div className="flex items-start gap-2" dir="ltr">
          <HelpCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2" title={row.original.en?.question || ""}>
              {row.original.en?.question || "-"}
            </span>
            <span className="text-sm text-zinc-500 line-clamp-1 mt-1" title={row.original.en?.answer || ""}>
              {row.original.en?.answer || "-"}
            </span>
          </div>
        </div>
      )
    },
    {
      id: "actions",
      header: () => <div className="text-center">{t("actions")}</div>,
      size: 80,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <TableActionMenu items={[{ text: t("details"), onClick: () => setSelectedFaq(row.original) }]} />
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

      <Dialog open={!!selectedFaq} onOpenChange={(open) => !open && setSelectedFaq(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
              <HelpCircle className="w-6 h-6 text-primary" />
              FAQ Details
            </DialogTitle>
          </DialogHeader>

          {selectedFaq && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { lang: "ar", label: "العربية", data: selectedFaq.ar },
                { lang: "en", label: "English", data: selectedFaq.en },
                { lang: "fa", label: "فارسی", data: selectedFaq.fa },
                { lang: "ms", label: "Bahasa Melayu", data: selectedFaq.ms },
                { lang: "tr", label: "Türkçe", data: selectedFaq.tr },
                { lang: "iid", label: "Indonesia", data: selectedFaq.iid },
              ].map((item) => (
                <div key={item.lang} className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden flex flex-col">
                  <div className="bg-zinc-100/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800 p-3 flex items-center justify-between">
                    <span className="text-sm font-bold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                      <Languages className="w-4 h-4 text-primary" />
                      {item.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase">{item.lang}</span>
                  </div>
                  <div className="p-4 flex flex-col gap-4 flex-1">
                    <div>
                      <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 mb-1.5">
                        <Type className="w-3 h-3" />
                        Question
                      </span>
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-3">
                        {item.data?.question || <span className="text-zinc-400 font-normal">-</span>}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 mb-1.5">
                        <AlignLeft className="w-3 h-3" />
                        Answer
                      </span>
                      <div className="text-sm text-zinc-700 dark:text-zinc-300">
                        {item.data?.answer || <span className="text-zinc-400 font-normal">-</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
