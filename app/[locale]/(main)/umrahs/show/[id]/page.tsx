"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useUmrah } from "@/features/umrahs/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Phone, Mail, User, CheckCircle2, Heart, Shirt, MapPin, RotateCw, MoonStar, Footprints, Scissors, Handshake } from "lucide-react"

const getStepIcon = (key: string) => {
  switch (key) {
    case 'oath': return <Handshake className="w-5 h-5 text-primary" />;
    case 'iharam': return <Shirt className="w-5 h-5 text-primary" />;
    case 'intention': return <Heart className="w-5 h-5 text-primary" />;
    case 'haram': return <MapPin className="w-5 h-5 text-primary" />;
    case 'tawaf': return <RotateCw className="w-5 h-5 text-primary" />;
    case 'ibrahim_shrine': return <MoonStar className="w-5 h-5 text-primary" />;
    case 'safa_marwa': return <Footprints className="w-5 h-5 text-primary" />;
    case 'shaving_hair': return <Scissors className="w-5 h-5 text-primary" />;
    default: return <CheckCircle2 className="w-5 h-5 text-primary" />;
  }
}

export default function UmrahDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useUmrah(id)
  const t = useTranslations("Umrahs")

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

  const umrah = response.data
  const client = umrah.client

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      {/* Unified Details Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* Compact Header */}
        <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary/10 relative">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                {client?.name || t("no_name")}
              </h1>
              <p className="text-xs text-zinc-500 font-medium">#{umrah.id}</p>
            </div>
          </div>
          <Badge variant={umrah.umrah_status === "done" ? "default" : "secondary"} className="rounded-lg">
            {umrah.umrah_status === "done" ? t("completed") : umrah.umrah_status === "pending" ? t("pending") : umrah.umrah_status}
          </Badge>
        </div>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-zinc-100 dark:divide-zinc-800">
            
            {/* Client Info (Compact) */}
            <div className="p-5 space-y-3">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">{t("client_info")}</h2>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Phone className="w-4 h-4 text-zinc-400" />
                <span dir="ltr">{umrah.phone || client?.phone ? `+${umrah.phone_code || client?.phone_code} ${umrah.phone || client?.phone}` : "-"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>{client?.email || "-"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <User className="w-4 h-4 text-zinc-400" />
                <span className="capitalize">{umrah.gender || client?.gender || "-"}</span>
              </div>
            </div>

            {/* Financials (Compact) */}
            <div className="p-5 space-y-2">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">{t("financials")}</h2>
              <div className="flex justify-between items-center text-sm text-zinc-600 dark:text-zinc-400">
                <span>{t("price_type")}</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{umrah.price} SAR</span>
              </div>
              <div className="flex justify-between items-center text-sm text-zinc-600 dark:text-zinc-400">
                <span>{t("tax")} ({umrah.tax_value}%)</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{umrah.tax_amount.toFixed(2)} SAR</span>
              </div>
              <div className="flex justify-between items-center text-sm text-zinc-600 dark:text-zinc-400">
                <span>{t("discount")}</span>
                <span className="font-semibold text-red-500">-{umrah.discount} SAR</span>
              </div>
              <div className="flex justify-between items-center pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{t("total")}</span>
                <span className="font-black text-primary">{umrah.total_price} SAR</span>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Umrah Steps / Cycle (Horizontal Grid/Flex) */}
      {umrah.cycle && umrah.cycle.length > 0 && (
        <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{t("umrah_steps")}</h2>
          </div>
          <CardContent className="p-4">
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {umrah.cycle.map((step) => (
                <div key={step.id} className="flex flex-col items-center text-center gap-2 min-w-[110px] p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center relative overflow-hidden">
                    {getStepIcon(step.key)}
                  </div>
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 line-clamp-2 h-8 flex items-center justify-center">
                    {step.title}
                  </span>
                  <Badge variant={step.is_done ? "default" : "outline"} className={`text-[10px] px-2 py-0 h-4 min-h-[16px] ${step.is_done ? 'bg-green-500 hover:bg-green-600' : 'text-zinc-500 bg-transparent'}`}>
                    {step.is_done ? t("completed_step") : t("pending_step")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
