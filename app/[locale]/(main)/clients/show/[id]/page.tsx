"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useClient } from "@/features/clients/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Phone, Mail, User, MapPin, Globe2, Activity } from "lucide-react"

export default function ClientDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useClient(id)
  const t = useTranslations("Clients")
  const commonT = useTranslations("Common")

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

  const client = response.data

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      {/* Unified Details Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* Compact Header */}
        <div className="flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary/10 relative">
              {client.image ? (
                <img src={client.image} alt={client.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                {client.name || t("no_name")}
              </h1>
              <p className="text-xs text-zinc-500 font-medium">#{client.id}</p>
            </div>
          </div>
          <Badge variant={client.is_active ? "default" : "secondary"} className="rounded-lg">
            {client.is_active ? t("active") : t("inactive")}
          </Badge>
        </div>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-zinc-100 dark:divide-zinc-800">
            
            {/* Personal Info */}
            <div className="p-5 space-y-3">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">{t("personal_info")}</h2>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Phone className="w-4 h-4 text-zinc-400" />
                <span dir="ltr">{client.phone ? `+${client.phone_code} ${client.phone}` : "-"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>{client.email || "-"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <User className="w-4 h-4 text-zinc-400" />
                <span className="capitalize">{client.gender || "-"}</span>
              </div>
            </div>

            {/* Location & Language */}
            <div className="p-5 space-y-3">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">{t("location")}</h2>
              {client.country && (
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  <span className="flex items-center gap-2">
                    {client.country.name} 
                    {client.country.flag && (
                       <img src={client.country.flag} alt={client.country.name} className="w-4 h-3 rounded-sm object-cover" />
                    )}
                  </span>
                </div>
              )}
              {client.country && (
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="text-[10px] font-bold text-zinc-400">{t("nationality")} :</span>
                  <span>{client.country.nationality_name || "-"}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Globe2 className="w-4 h-4 text-zinc-400" />
                <span className="uppercase">{client.locale || "-"}</span>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Client Umrahs */}
      {client.umrahs && client.umrahs.length > 0 && (
        <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{t("client_umrahs")}</h2>
          </div>
          <CardContent className="p-4">
            <div className="flex flex-col gap-3">
              {client.umrahs.map((umrah) => (
                <div key={umrah.id} className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center relative overflow-hidden">
                       <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                       <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 block">
                         #{umrah.id} - {umrah.price} SAR
                       </span>
                       <span className="text-xs text-zinc-500">
                         {new Date(umrah.created_at).toLocaleDateString()}
                       </span>
                    </div>
                  </div>
                  <Badge variant={umrah.umrah_status === "done" ? "default" : "secondary"} className="rounded-lg">
                    {umrah.umrah_status === "done" ? t("completed") : umrah.umrah_status === "pending" ? t("pending") : umrah.umrah_status}
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
