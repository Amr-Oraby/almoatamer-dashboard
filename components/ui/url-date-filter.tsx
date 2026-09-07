"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  
  const value = searchParams.get(filterKey)
  const date = value ? new Date(value) : undefined

  const handleChange = (newDate: Date | undefined) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newDate) {
      params.set(filterKey, format(newDate, "yyyy-MM-dd"))
    } else {
      params.delete(filterKey)
    }
    
    // Reset to page 1 on filter change
    params.delete("page")
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Popover>
      <PopoverTrigger render={
        <Button
          variant={"outline"}
          className={cn(
            "h-10 px-4 py-2 text-sm font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700 justify-start text-left flex-1 min-w-[130px] sm:flex-none max-w-full sm:max-w-[200px] flex",
            !date && "text-zinc-500 dark:text-zinc-400"
          )}
        >
          <CalendarIcon className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4 shrink-0" />
          <span className="truncate">{date ? format(date, "PPP") : (label || "Pick a date")}</span>
        </Button>
      } />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleChange}
        />
      </PopoverContent>
    </Popover>
  )
}
