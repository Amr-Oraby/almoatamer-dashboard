"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"

interface UrlDateFilterProps {
  filterKey: string
  label?: string
}

export function UrlDateFilter({ filterKey, label }: UrlDateFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const value = searchParams.get(filterKey) || ""

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    
    if (newValue) {
      params.set(filterKey, newValue)
    } else {
      params.delete(filterKey)
    }
    
    // Reset to page 1 on filter change
    params.delete("page")
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={handleChange}
        className="h-10 px-3 py-2 text-sm font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700 min-w-[140px]"
      />
    </div>
  )
}
