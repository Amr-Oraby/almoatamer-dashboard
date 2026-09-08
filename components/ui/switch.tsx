import { cn } from "@/lib/utils"

export interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  activeColor?: string;
  inactiveColor?: string;
}

export function Switch({ 
  checked, 
  onChange, 
  activeColor = "bg-primary", 
  inactiveColor = "bg-zinc-200 dark:bg-zinc-800" 
}: SwitchProps) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "w-11 h-6 rounded-full flex items-center px-1 transition-colors outline-none",
        checked ? activeColor : inactiveColor
      )}
    >
      <div className={cn(
        "w-4 h-4 rounded-full bg-white transition-transform shadow-sm",
        checked ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0"
      )} />
    </button>
  )
}
