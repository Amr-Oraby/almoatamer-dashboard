"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useCountry } from "@/features/countries/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Globe, Flag, Phone, Hash, Type, Users, Languages } from "lucide-react"

export default function CountryDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useCountry(id)
  const t = useTranslations("Countries")

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

  const country = response.data

  const translations = [
    { lang: "ar", label: t("ar"), data: country.ar },
    { lang: "en", label: t("en"), data: country.en },
    { lang: "tr", label: t("tr"), data: country.tr },
    { lang: "fa", label: t("fa"), data: country.fa },
    { lang: "ms", label: t("ms"), data: country.ms },
    { lang: "iid", label: t("iid"), data: country.iid },
  ]

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      {/* Header Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700">
               {country.flag ? (
                 <img src={country.flag} alt={country.short_name} className="w-full h-full object-cover" />
               ) : (
                 <Flag className="h-8 w-8 text-zinc-400" />
               )}
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mb-1">{t("country_details")}</p>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                {country.ar?.name || country.en?.name || country.short_name}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <Hash className="w-4 h-4 text-zinc-400" />
            <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">{t("country_id")}: {country.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-zinc-100 dark:divide-zinc-800 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase">{t("short_name")}</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">{country.short_name}</p>
                </div>
            </div>
            <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase">{t("phone_code")}</p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400" dir="ltr">{country.code}</p>
                </div>
            </div>
            <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Hash className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase">{t("phone_length")}</p>
                    <p className="font-bold text-amber-600 dark:text-amber-400">{country.phone_length}</p>
                </div>
            </div>
        </div>
      </Card>

      {/* Translations Grid */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Languages className="w-5 h-5 text-primary" />
                {t("translations")}
            </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {translations.map((item) => (
                    <div key={item.lang} className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-zinc-100/50 dark:bg-zinc-900/50 px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                            <span className="font-bold text-zinc-700 dark:text-zinc-300">{item.label}</span>
                            <span className="text-xs font-mono font-bold text-zinc-400 uppercase">{item.lang}</span>
                        </div>
                        <div className="p-4 space-y-3">
                            <div>
                                <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                                    <Type className="w-3 h-3" />
                                    {t("name")}
                                </span>
                                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                    {item.data?.name || <span className="text-zinc-400 font-normal">-</span>}
                                </p>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                                    <Users className="w-3 h-3" />
                                    {t("nationality")}
                                </span>
                                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                    {item.data?.nationality_name || <span className="text-zinc-400 font-normal">-</span>}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
