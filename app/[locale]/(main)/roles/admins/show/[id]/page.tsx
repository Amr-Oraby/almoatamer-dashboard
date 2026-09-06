"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useAdmin } from "@/features/admins/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, ShieldCheck, User as UserIcon, Phone, Mail, Calendar, Hash, Shield } from "lucide-react"

export default function AdminDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useAdmin(id)
  const t = useTranslations("Admins")

  if (isLoading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Assuming response?.data has the AdminItem based on previous endpoints
  const admin = response?.data

  if (isError || !admin) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-500">{t("not_found")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      {/* Header Profile Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex flex-col md:flex-row md:items-start justify-between p-6 gap-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary/10 border-4 border-white dark:border-zinc-900 shadow-md shrink-0">
               {admin.image ? (
                 <img src={admin.image} alt={admin.name} className="w-full h-full object-cover" />
               ) : (
                 <UserIcon className="h-10 w-10 text-primary" />
               )}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                {admin.name}
              </h1>
              <p className="text-sm font-medium text-zinc-500 capitalize">{admin.gender || "-"}</p>
              
              <div className="flex items-center gap-2 pt-2">
                {admin.is_active ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">{t("active")}</Badge>
                ) : (
                    <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20">{t("inactive")}</Badge>
                )}
                <Badge variant="outline" className="font-mono text-zinc-500">
                  ID: {admin.id}
                </Badge>
              </div>
            </div>
          </div>

          {/* Role Summary */}
          {admin.role ? (
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-4">
              <div className="mt-1">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase mb-1">{t("role")}</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{admin.role.ar?.name || admin.role.en?.name || "-"}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-3 text-zinc-400">
              <Shield className="w-5 h-5" />
              <p className="text-sm font-medium">{t("no_role")}</p>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden h-full">
            <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-primary" />
                    {t("contact_info")}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-bold text-zinc-500 uppercase mb-0.5">الهاتف</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100" dir="ltr">
                      {admin.phone ? `+${admin.phone_code} ${admin.phone}` : "-"}
                    </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-bold text-zinc-500 uppercase mb-0.5">البريد الإلكتروني</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100 break-all">
                      {admin.email || "-"}
                    </p>
                </div>
              </div>
            </CardContent>
        </Card>

        {/* Account Details */}
        <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden h-full">
            <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Hash className="w-5 h-5 text-primary" />
                    {t("admin_details")}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-bold text-zinc-500 uppercase mb-0.5">{t("created_at")}</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100" dir="ltr">
                      {admin.created_at || "-"}
                    </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-bold text-zinc-500 uppercase mb-0.5">{t("updated_at")}</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100" dir="ltr">
                      {admin.updated_at || "-"}
                    </p>
                </div>
              </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
