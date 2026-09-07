"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"
import { X } from "lucide-react"

interface ClearFiltersButtonProps {
  label: string
}

export function ClearFiltersButton({ label }: ClearFiltersButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Check if there are any active filters (ignoring the page parameter if it's the only one)
  const hasFilters = Array.from(searchParams.keys()).some(key => key !== 'page')

  if (!hasFilters) return null

  return (
    <Button
      variant="destructive"
      onClick={() => router.push(pathname)}
      className="cursor-pointer h-10 px-4 rounded-xl font-medium shrink-0 shadow-sm"
    >
      <X className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Button>
  )
}
