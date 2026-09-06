"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useMoatmr } from "@/features/moatmrs/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Phone, Mail, User, MapPin, Globe2, Wallet, Star, CheckCircle2, XCircle } from "lucide-react"

export default function MoatmrDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useMoatmr(id)
  const t = useTranslations("Almoatamers")

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

  const moatamer = response.data

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      {/* Unified Details Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* Compact Header */}
        <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 relative">
              {moatamer.image ? (
                <img src={moatamer.image} alt={moatamer.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-8 w-8 text-primary" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                {moatamer.name || t("no_name")}
              </h1>
              <p className="text-sm text-zinc-500 font-medium mt-1">#{moatamer.id}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Badge variant={moatamer.is_active ? "default" : "secondary"} className="rounded-lg text-sm px-3 py-1">
                {moatamer.is_active ? t("active") : t("inactive")}
            </Badge>
            <Badge variant={moatamer.is_available ? "outline" : "secondary"} className={`rounded-lg text-sm px-3 py-1 ${moatamer.is_available ? 'border-green-500 text-green-600' : ''}`}>
                {moatamer.is_available ? t("available") : t("unavailable")}
            </Badge>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-zinc-100 dark:divide-zinc-800">
            
            {/* Personal Info */}
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">{t("personal_info")}</h2>
              <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                <Phone className="w-5 h-5 text-zinc-400" />
                <span dir="ltr" className="font-medium">{moatamer.phone ? `+${moatamer.phone_code} ${moatamer.phone}` : "-"}</span>
              </div>
              <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                <Mail className="w-5 h-5 text-zinc-400" />
                <span className="font-medium">{moatamer.email || "-"}</span>
              </div>
              <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                <User className="w-5 h-5 text-zinc-400" />
                <span className="capitalize font-medium">{moatamer.gender || "-"}</span>
              </div>
              <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                {moatamer.accepted_by_admin ? (
                   <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                   <XCircle className="w-5 h-5 text-red-400" />
                )}
                <span className={`font-medium ${moatamer.accepted_by_admin ? 'text-green-600' : 'text-red-500'}`}>
                   {moatamer.accepted_by_admin ? t("accepted") : t("not_accepted")}
                </span>
              </div>
            </div>

            {/* Location & Language */}
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">{t("location")}</h2>
              {moatamer.country && (
                <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                  <MapPin className="w-5 h-5 text-zinc-400" />
                  <span className="flex items-center gap-2 font-medium">
                    {moatamer.country.name} 
                    {moatamer.country.flag && (
                       <img src={moatamer.country.flag} alt={moatamer.country.name} className="w-5 h-4 rounded-sm object-cover" />
                    )}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                <Globe2 className="w-5 h-5 text-zinc-400" />
                <span className="uppercase font-medium">{moatamer.locale || "-"}</span>
              </div>
            </div>

            {/* Financials and Ratings */}
            <div className="p-6 space-y-4 md:col-span-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">{t("financials")}</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Wallet className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 font-bold mb-1">{t("wallet_balance")}</p>
                            <p className="text-xl font-black text-zinc-900 dark:text-zinc-100">{moatamer.wallet_balance || 0} SAR</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                            <Wallet className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 font-bold mb-1">{t("pending_balance")}</p>
                            <p className="text-xl font-black text-zinc-900 dark:text-zinc-100">{moatamer.wallet_pending_balance || 0} SAR</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                            <Star className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 font-bold mb-1">{t("rate")}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-xl font-black text-zinc-900 dark:text-zinc-100">{moatamer.rate || 0}</p>
                                <span className="text-sm text-zinc-400">/ 5.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
