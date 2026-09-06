"use client"

import { useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { TableSkeleton } from "@/components/ui/table-skeleton"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { TableActionMenu } from "@/components/ui/table-action-menu"
import { UrlPagination } from "@/components/ui/url-pagination"
import { useSearchParams } from "next/navigation"

import { useLanguages } from "@/features/languages/hooks"
import { LanguageItem } from "@/features/languages/types"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Languages, Globe, Flag, Hash, Type } from "lucide-react"

export function LanguagesTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useLanguages(page)
  
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageItem | null>(null)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<LanguageItem>[]>(() => [
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
      id: "flag",
      header: () => <div className="text-center">العلم</div>,
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <div className="relative w-12 h-8 rounded overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
              <Image 
                src={row.original.flag} 
                alt={row.original.short_name} 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )
      }
    },
    {
      id: "short_name",
      header: () => <div className="text-center">الرمز</div>,
      size: 100,
      cell: ({ row }) => (
        <div className="text-center">
          <Badge variant="outline" className="font-mono text-zinc-600 dark:text-zinc-400 uppercase">
            {row.original.short_name}
          </Badge>
        </div>
      )
    },
    {
      id: "name_ar",
      header: () => <div className="text-center">الاسم (عربي)</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.ar?.name || "-"}
        </div>
      )
    },
    {
      id: "name_en",
      header: () => <div className="text-center">الاسم (إنجليزي)</div>,
      size: 200,
      cell: ({ row }) => (
        <div className="text-center font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.en?.name || "-"}
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
            <TableActionMenu items={[{ text: t("details"), onClick: () => setSelectedLanguage(row.original) }]} />
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

      <Dialog open={!!selectedLanguage} onOpenChange={(open) => !open && setSelectedLanguage(null)}>
        <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-primary" />
              Language Details
            </DialogTitle>
          </DialogHeader>

          {selectedLanguage && (
            <div className="flex flex-col gap-6">
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-11 rounded-lg overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
                      <Image 
                        src={selectedLanguage.flag} 
                        alt={selectedLanguage.short_name} 
                        fill 
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-1">Code</span>
                        <Badge variant="outline" className="font-mono text-lg text-zinc-700 dark:text-zinc-300 uppercase w-fit">
                            {selectedLanguage.short_name}
                        </Badge>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-1">ID</span>
                    <span className="font-mono text-zinc-700 dark:text-zinc-300 text-lg font-black">#{selectedLanguage.id}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { lang: "ar", label: "العربية", data: selectedLanguage.ar },
                  { lang: "en", label: "English", data: selectedLanguage.en },
                  { lang: "fa", label: "فارسی", data: selectedLanguage.fa },
                  { lang: "ms", label: "Bahasa Melayu", data: selectedLanguage.ms },
                  { lang: "tr", label: "Türkçe", data: selectedLanguage.tr },
                  { lang: "iid", label: "Indonesia", data: selectedLanguage.iid },
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
                        Translated Name
                      </span>
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {item.data?.name || <span className="text-zinc-400 font-normal">-</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
