"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
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
    <div className="flex-1 min-w-[200px] max-w-full sm:max-w-[300px] flex gap-2">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="h-4 w-4 text-zinc-500" />
        </div>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-10 ps-10 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus-visible:ring-primary/50 shadow-sm"
        />
      </div>
      <Button 
        onClick={handleApply}
        variant="secondary"
        className="h-10 rounded-xl px-4 shadow-sm"
      >
        {buttonText}
      </Button>
    </div>
  )
}
