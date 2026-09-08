"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Trash2 } from "lucide-react"

import { useHomeBanners, useDeleteHomeBanner } from "@/features/home-banners/hooks"
import { DeleteDialog } from "@/components/ui/delete-dialog"
import { UrlPagination } from "@/components/ui/url-pagination"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function HomeBannersGrid() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data, isLoading } = useHomeBanners(page)
  const { mutate: deleteHomeBanner, isPending: isDeleting } = useDeleteHomeBanner()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  
  const t = useTranslations("HomeBanners")

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const banners = data?.data || []

  return (
    <div className="w-full flex flex-col gap-6">
      {banners.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          {t("not_found", { fallback: "No banners found" })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div 
              key={banner.id} 
              className="group flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                {banner.image ? (
                  <Image 
                    src={banner.image} 
                    alt="Banner" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    unoptimized 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    بدون صورة
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-950">
                <Badge 
                  variant={banner.is_active ? "default" : "secondary"} 
                  className={banner.is_active ? "shadow-sm bg-emerald-500 hover:bg-emerald-600 text-white" : "shadow-sm px-3"}
                >
                  {banner.is_active ? t("active", { fallback: "Active" }) : t("inactive", { fallback: "Inactive" })}
                </Badge>

                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 shadow-sm text-xs font-medium px-3"
                  >
                    {t("update", { fallback: "Update" })}
                  </Button>
                  <Button 
                    size="icon" 
                    variant="destructive" 
                    className="h-8 w-8 shadow-sm shrink-0"
                    onClick={() => setDeleteId(String(banner.id))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {data?.meta && data.meta.last_page > 1 && (
        <div className="mt-4 flex justify-center">
          <UrlPagination pageCount={data.meta.last_page} />
        </div>
      )}

      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteHomeBanner(deleteId, {
              onSuccess: () => setDeleteId(null),
            });
          }
        }}
        isDeleting={isDeleting}
      />
    </div>
  )
}
