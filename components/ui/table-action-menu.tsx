"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { useRouter } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export interface ActionMenuItem {
  text: string;
  href?: string;
  onClick?: () => void;
  isDestructive?: boolean;
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
            onClick={() => {
              if (item.onClick) item.onClick();
              if (item.href) router.push(item.href);
            }}
            className={cn(
              "cursor-pointer font-bold justify-end",
              item.isDestructive 
                ? "text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-500 dark:focus:bg-red-950 dark:focus:text-red-400" 
                : "text-zinc-700 dark:text-zinc-300"
            )}
          >
            {item.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
