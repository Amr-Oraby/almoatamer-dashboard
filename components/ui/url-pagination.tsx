"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface UrlPaginationProps {
  pageCount: number
}

export function UrlPagination({ pageCount }: UrlPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations("Common")
  
  const page = Number(searchParams.get("page")) || 1

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  if (pageCount <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2 space-x-reverse py-6">
      <button
        onClick={() => handlePageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-4 py-2 text-zinc-400 font-bold hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-50 transition-colors"
      >
        {t("previous")}
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
          // Simple window logic
          let pageNum = i + 1
          if (pageCount > 5 && page > 3) {
            pageNum = page - 3 + i
            if (pageNum > pageCount) pageNum = pageCount - (4 - i)
          }
          
          const isActive = pageNum === page
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-colors shadow-sm",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-transparent"
              )}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => handlePageChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        className="px-4 py-2 text-zinc-600 font-bold hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-50 transition-colors"
      >
        {t("next")}
      </button>
    </div>
  )
}
