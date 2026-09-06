import * as React from "react"

interface EndpointBadgeProps {
  children: React.ReactNode
}

export function EndpointBadge({ children }: EndpointBadgeProps) {
  return (
    <p className="text-gray-500 text-sm mb-4 flex items-center gap-2 ">
      <span className="text-black dark:text-white font-bold text-lg bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md">
        {children}
      </span>
    </p>
  )
}
