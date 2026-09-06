"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useThankingWord } from "@/features/thanking-words/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Calendar, MessageSquare, Quote } from "lucide-react"

export default function ThankingWordDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useThankingWord(id)
  const t = useTranslations("ThankingWords")

  if (isLoading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isError || !response?.data) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-500">{t("not_found")}</p>
      </div>
    )
  }

  const word = response.data

  return (
    <div className="space-y-6 pb-10 max-w-4xl mx-auto">
      {/* Unified Details Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* Compact Header */}
        <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 relative">
              {word.image ? (
                <img src={word.image} alt={word.name} className="h-full w-full object-cover" />
              ) : (
                <MessageSquare className="h-8 w-8 text-primary" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                {word.name || t("no_name")}
              </h1>
              <p className="text-sm text-zinc-500 font-medium mt-1">#{word.id}</p>
            </div>
          </div>
          <Badge variant={word.is_active ? "default" : "secondary"} className="rounded-lg text-sm px-3 py-1">
            {word.is_active ? t("active") : t("inactive")}
          </Badge>
        </div>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-zinc-100 dark:divide-zinc-800">
            
            {/* Word details */}
            <div className="p-6 space-y-4 md:col-span-2">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">{t("word_details")}</h2>
              
              <div className="flex items-start gap-4 text-base text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <Quote className="w-8 h-8 text-primary/40 shrink-0" />
                <p className="font-medium text-lg text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                  "{word.text}"
                </p>
              </div>

              {word.date && (
                <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400 mt-4">
                  <Calendar className="w-5 h-5 text-zinc-400" />
                  <span className="font-medium">{word.date}</span>
                </div>
              )}
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
