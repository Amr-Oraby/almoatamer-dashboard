"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useTerm } from "@/features/terms/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, FileText, Languages, Type, AlignLeft, Calendar, Hash } from "lucide-react"

export default function TermDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useTerm(id)
  const t = useTranslations("Terms")

  if (isLoading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Handle both { data: TermItem } or direct TermItem
  const term = response?.data || response

  if (isError || !term) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-500">{t("not_found")}</p>
      </div>
    )
  }

  const translations = [
    { lang: "ar", label: t("ar"), data: term.ar },
    { lang: "en", label: t("en"), data: term.en },
    { lang: "tr", label: t("tr"), data: term.tr },
    { lang: "fa", label: t("fa"), data: term.fa },
    { lang: "ms", label: t("ms"), data: term.ms },
    { lang: "iid", label: t("iid"), data: term.iid },
  ]

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      {/* Header Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex flex-col md:flex-row md:items-start justify-between p-6 gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-primary/10 border border-primary/20 shrink-0">
               <FileText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mb-1">{t("term_details")}</p>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                {term.ar?.title || term.en?.title || "-"}
              </h1>
              
              <div className="flex items-center gap-2 mt-3">
                {term.is_active ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">{t("active")}</Badge>
                ) : (
                    <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20">{t("inactive")}</Badge>
                )}
                <Badge variant="outline" className="font-mono text-zinc-500">
                  {t("term_id")}: {term.id}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
             <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Calendar className="w-4 h-4" />
                <span>{term.created_at || "-"}</span>
             </div>
          </div>
        </div>
      </Card>

      {/* Translations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {translations.map((item) => (
            <Card key={item.lang} className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden h-full flex flex-col">
                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 pb-3 py-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                        <Languages className="w-4 h-4 text-primary" />
                        {item.label}
                    </CardTitle>
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase">{item.lang}</span>
                </CardHeader>
                <CardContent className="p-5 flex-1 flex flex-col gap-4">
                    <div>
                        <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 mb-1.5">
                            <Type className="w-3 h-3" />
                            {t("title")}
                        </span>
                        <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 min-h-[44px]">
                            {item.data?.title || <span className="text-zinc-400 font-normal">-</span>}
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 mb-1.5">
                            <AlignLeft className="w-3 h-3" />
                            {t("desc")}
                        </span>
                        {item.data?.desc ? (
                          <div 
                            className="text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 prose prose-sm dark:prose-invert max-w-none flex-1 overflow-auto max-h-[200px]"
                            dangerouslySetInnerHTML={{ __html: item.data.desc }}
                          />
                        ) : (
                          <div className="text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 flex-1 overflow-auto max-h-[200px]">
                            <span className="text-zinc-400 font-normal">-</span>
                          </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  )
}
