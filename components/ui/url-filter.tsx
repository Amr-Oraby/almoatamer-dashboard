"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"

import { Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface UrlFilterProps {
  filterKey: string
  options: { label: string; value: string }[]
  placeholder?: string
  isLoading?: boolean
}

export function UrlFilter({ filterKey, options, placeholder, isLoading }: UrlFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Use null so Shadcn natively applies placeholder styling while remaining a controlled component
  const value = searchParams.get(filterKey) || null

  const handleChange = (newValue: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newValue && newValue !== "all") {
      params.set(filterKey, newValue)
    } else {
      params.delete(filterKey)
    }
    
    // Reset to page 1 on filter change
    params.delete("page")
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Select value={value} onValueChange={handleChange} disabled={isLoading}>
      <SelectTrigger
        className={cn(
          "!h-10 !px-4 py-2 text-sm font-medium !rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700 flex-1 min-w-[130px] sm:flex-none max-w-full sm:max-w-[200px] flex gap-2",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className="flex-1 text-left truncate rtl:text-right">
          <SelectValue placeholder={placeholder || "All"} />
        </span>
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0 text-zinc-500" />}
      </SelectTrigger>
      <SelectContent className="max-h-[250px]">
        <SelectItem value="all">{placeholder || "All"}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
