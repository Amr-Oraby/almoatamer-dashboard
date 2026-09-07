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
    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 py-4 sm:py-6">
      <button
        onClick={() => handlePageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-2 sm:px-3 py-2 text-zinc-500 font-medium hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-50 transition-colors text-sm"
      >
        {t("previous")}
      </button>
      
      <div className="flex items-center gap-1">
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
                "w-8 h-8 sm:w-9 sm:h-9 rounded-md flex items-center justify-center font-medium text-sm transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
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
        className="px-2 sm:px-3 py-2 text-zinc-500 font-medium hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-50 transition-colors text-sm"
      >
        {t("next")}
      </button>
    </div>
  )
}
