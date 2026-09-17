"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useMoatmrsWithoutPagination } from "@/features/moatmrs/hooks"
import { Moatmr } from "@/features/moatmrs/types"
import { useSetMoatmerToUmrah } from "@/features/umrahs/hooks"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function SetMoatmerForm({ umrahId }: { umrahId: string }) {
  const t = useTranslations("Umrahs")
  const tCommon = useTranslations("Common")
  const [selectedMoatmer, setSelectedMoatmer] = useState<string>("")

  const { data: moatmrsData, isLoading: isLoadingMoatmrs } = useMoatmrsWithoutPagination()
  const { mutate: setMoatmer, isPending: isSetting } = useSetMoatmerToUmrah(umrahId)

  const handleSetMoatmer = () => {
    if (!selectedMoatmer) return
    setMoatmer(selectedMoatmer, {
      onSuccess: () => {
        setSelectedMoatmer("")
      }
    })
  }

  const moatmrs = moatmrsData?.data || []

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
      <div className="w-full sm:w-[300px]">
        <Select 
          value={selectedMoatmer} 
          onValueChange={(val: string | null) => setSelectedMoatmer(val || "")}
          disabled={isLoadingMoatmrs || isSetting}
        >
          <SelectTrigger>
            {isLoadingMoatmrs ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                <span>{tCommon("loading") || "Loading..."}</span>
              </div>
            ) : (
              <SelectValue placeholder={t("select_moatmer") || "Select Moatmer"} />
            )}
          </SelectTrigger>
          <SelectContent>
            {moatmrs.map((m: Moatmr) => (
              <SelectItem key={m.id} value={m.id.toString()}>
                {m.name} {m.phone ? `(${m.phone})` : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button 
        onClick={handleSetMoatmer} 
        disabled={!selectedMoatmer || isSetting}
        className="w-full sm:w-auto"
      >
        {isSetting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        {t("set_moatmer") || "Set Moatmer"}
      </Button>
    </div>
  )
}
