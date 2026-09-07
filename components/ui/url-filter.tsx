"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"

interface UrlFilterProps {
  filterKey: string
  options: { label: string; value: string }[]
  placeholder?: string
}

export function UrlFilter({ filterKey, options, placeholder }: UrlFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const value = searchParams.get(filterKey) || ""

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    <div className="relative">
      <select
        value={value}
        onChange={handleChange}
        className="h-10 px-4 py-2 pr-10 text-sm font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer appearance-none shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700 min-w-[140px]"
      >
        <option value="">{placeholder || "All"}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-3 text-zinc-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
