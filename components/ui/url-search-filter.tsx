"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UrlSearchFilterProps {
  filterKey?: string
  placeholder?: string
  buttonText?: string
}

export function UrlSearchFilter({ 
  filterKey = "keyword", 
  placeholder = "Search...",
  buttonText = "Apply"
}: UrlSearchFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const initialValue = searchParams.get(filterKey) || ""
  const [value, setValue] = useState(initialValue)

  // Sync state with URL if it changes externally (e.g. clear filters)
  useEffect(() => {
    setValue(searchParams.get(filterKey) || "")
  }, [searchParams, filterKey])

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value.trim()) {
      params.set(filterKey, value.trim())
    } else {
      params.delete(filterKey)
    }
    
    // Reset to page 1 on filter change
    params.delete("page")
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApply()
    }
  }

  return (
    <div className="flex-1 min-w-[200px] max-w-full sm:max-w-[300px]">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="h-4 w-4 text-zinc-500" />
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex h-10 w-full bg-transparent py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ps-10 pe-16 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-colors"
        />
        <Button 
          onClick={handleApply}
          variant="ghost"
          size="sm"
          className="absolute inset-y-1 end-1 h-8 px-3 font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
