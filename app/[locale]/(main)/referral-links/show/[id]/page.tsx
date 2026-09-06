"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useReferralLink } from "@/features/referral-links/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Link2, User, MapPin, Activity, Coins, Hash } from "lucide-react"

export default function ReferralLinkDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useReferralLink(id)
  const t = useTranslations("ReferralLinks")

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

  const referral = response.data

  return (
    <div className="space-y-6 pb-10 max-w-4xl mx-auto">
      {/* Unified Details Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* Compact Header */}
        <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 relative">
               <Link2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                {referral.marketer || t("no_marketer")}
              </h1>
              <p className="text-sm text-zinc-500 font-medium mt-1">#{referral.id}</p>
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-zinc-100 dark:divide-zinc-800">
            
            {/* Referral Info */}
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">{t("details")}</h2>
              
              <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                  <User className="w-5 h-5 text-zinc-400" />
                  <span className="font-medium">{t("marketer")}</span>
                </div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{referral.marketer || "-"}</span>
              </div>

              <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                  <MapPin className="w-5 h-5 text-zinc-400" />
                  <span className="font-medium">{t("city")}</span>
                </div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{referral.city?.name || "-"}</span>
              </div>

              <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                  <Activity className="w-5 h-5 text-zinc-400" />
                  <span className="font-medium">{t("type")}</span>
                </div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{referral.type || "-"}</span>
              </div>
            </div>

            {/* Value & Links Info */}
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3 invisible md:visible">{t("details")}</h2>
              
              <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                  <Hash className="w-5 h-5 text-zinc-400" />
                  <span className="font-medium">{t("value")}</span>
                </div>
                <span className="font-bold text-primary">{referral.value || 0}</span>
              </div>

              <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                  <Coins className="w-5 h-5 text-zinc-400" />
                  <span className="font-medium">{t("total")}</span>
                </div>
                <span className="font-bold text-green-600 dark:text-green-500">{referral.total || 0}</span>
              </div>

              <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-2 mt-4">
                  <p className="text-xs font-bold text-zinc-500 uppercase">{t("identifier")}</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-wider bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg break-all">
                      {referral.identifier}
                  </p>
                  
                  <p className="text-xs font-bold text-zinc-500 uppercase mt-4">{t("link")}</p>
                  <a href={referral.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline break-all flex items-center gap-2">
                      <Link2 className="w-4 h-4 shrink-0" />
                      {referral.link}
                  </a>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
