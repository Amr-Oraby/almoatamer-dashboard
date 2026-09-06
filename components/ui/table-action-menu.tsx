"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { useRouter } from "@/i18n/routing"

export interface ActionMenuItem {
  text: string;
  href: string;
}

interface TableActionMenuProps {
  items: ActionMenuItem[];
}

export function TableActionMenu({ items }: TableActionMenuProps) {
  const router = useRouter()

  if (!items || items.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 outline-none">
        <MoreVertical className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 rounded-xl">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => router.push(item.href)}
            className="cursor-pointer font-bold text-zinc-700 dark:text-zinc-300 justify-end"
          >
            {item.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
