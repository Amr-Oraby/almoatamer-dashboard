"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useCoupon } from "@/features/coupons/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Ticket, Percent, Calendar, Hash, Activity } from "lucide-react"

export default function CouponDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useCoupon(id)
  const t = useTranslations("Coupons")

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

  const coupon = response.data

  return (
    <div className="space-y-6 pb-10 max-w-4xl mx-auto">
      {/* Unified Details Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* Compact Header */}
        <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 relative">
               <Ticket className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight tracking-widest">
                {coupon.code || t("no_code")}
              </h1>
              <p className="text-sm text-zinc-500 font-medium mt-1">#{coupon.id}</p>
            </div>
          </div>
          <Badge variant={coupon.status ? "default" : "secondary"} className="rounded-lg text-sm px-3 py-1">
            {coupon.status ? t("active") : t("inactive")}
          </Badge>
        </div>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-zinc-100 dark:divide-zinc-800">
            
            {/* Coupon Info */}
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">{t("coupon_details")}</h2>
              
              <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                  <Activity className="w-5 h-5 text-zinc-400" />
                  <span className="font-medium">{t("type")}</span>
                </div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase">{coupon.type}</span>
              </div>

              <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                  <Percent className="w-5 h-5 text-zinc-400" />
                  <span className="font-medium">{t("discount_amount")}</span>
                </div>
                <span className="font-black text-primary text-lg">
                    {coupon.discount_amount} {coupon.type === 'percentage' ? '%' : 'SAR'}
                </span>
              </div>
            </div>

            {/* Usage & Dates Info */}
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">{t("usage_info")}</h2>
              
              <div className="space-y-4">
                  <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                    <Calendar className="w-5 h-5 text-zinc-400 shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-400 uppercase">{t("start_date")}</span>
                        <span className="font-medium">{coupon.start_date || "-"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                    <Calendar className="w-5 h-5 text-red-400 shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-400 uppercase">{t("expiry_date")}</span>
                        <span className="font-medium text-red-500">{coupon.expiry_date || "-"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                    <Hash className="w-5 h-5 text-zinc-400 shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-400 uppercase">{t("usage_limit")}</span>
                        <span className="font-medium">{coupon.usage_limit || "∞"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
                    <Activity className="w-5 h-5 text-zinc-400 shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-400 uppercase">{t("times_used")}</span>
                        <span className="font-medium text-primary">{coupon.times_used || "0"}</span>
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
