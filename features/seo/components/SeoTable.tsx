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

import { useSeos } from "@/features/seo/hooks"
import { SeoItem } from "@/features/seo/types"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Hash, Tag, Activity } from "lucide-react"

export function SeoTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useSeos(page)
  
  const [selectedSeo, setSelectedSeo] = useState<SeoItem | null>(null)
  
  // Using generic terms from "Umrahs" to prevent crashes and ensure Arabic text
  const t = useTranslations("Umrahs")

  const columns = useMemo<ColumnDef<SeoItem>[]>(() => [
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
      id: "title",
      header: () => <div className="text-center">العنوان (Title)</div>,
      size: 400,
      cell: ({ row }) => (
        <div className="text-right font-bold text-zinc-900 dark:text-zinc-100">
          {row.original.title}
        </div>
      )
    },
    {
      id: "seoable_type",
      header: () => <div className="text-center">النوع (Type)</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="text-center">
          <Badge variant="secondary" className="font-mono text-zinc-600 dark:text-zinc-400">
            {row.original.seoable_type}
          </Badge>
        </div>
      )
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
            <TableActionMenu items={[{ text: t("details"), onClick: () => setSelectedSeo(row.original) }]} />
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

      <Dialog open={!!selectedSeo} onOpenChange={(open) => !open && setSelectedSeo(null)}>
        <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
              <Search className="w-6 h-6 text-primary" />
              SEO Details
            </DialogTitle>
          </DialogHeader>

          {selectedSeo && (
            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 flex flex-col gap-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-1">Title</h3>
                  <p className="text-lg font-black text-zinc-900 dark:text-zinc-100">{selectedSeo.title}</p>
                </div>
                {selectedSeo.is_active ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">نشط</Badge>
                ) : (
                    <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20">غير نشط</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 p-4 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    SEOable Type
                  </span>
                  <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300">{selectedSeo.seoable_type}</span>
                </div>
                
                <div className="flex flex-col gap-1.5 p-4 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5" />
                    ID
                  </span>
                  <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300">{selectedSeo.id}</span>
                </div>
              </div>
              
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
