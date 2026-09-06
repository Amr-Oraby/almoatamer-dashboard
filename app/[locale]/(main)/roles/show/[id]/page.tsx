"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useRole } from "@/features/roles/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, ShieldCheck, Languages, Type, Shield, CheckCircle2, LockKeyhole } from "lucide-react"

export default function RoleDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useRole(id)
  const t = useTranslations("Roles")

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

  const role = response.data

  const translations = [
    { lang: "ar", label: t("ar"), data: role.ar },
    { lang: "en", label: t("en"), data: role.en },
    { lang: "tr", label: t("tr"), data: role.tr },
    { lang: "fa", label: t("fa"), data: role.fa },
    { lang: "ms", label: t("ms"), data: role.ms },
    { lang: "iid", label: t("iid"), data: role.iid },
  ]

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      {/* Header Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 shrink-0 border border-primary/20">
               <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mb-1">{t("role_details")}</p>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                {role.ar?.name || role.en?.name || "-"}
              </h1>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-2">
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-500">{t("status")}:</span>
                {role.is_active ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">{t("active")}</Badge>
                ) : (
                    <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20">{t("inactive")}</Badge>
                )}
            </div>
            <span className="text-xs font-bold text-zinc-400">ID: {role.id}</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Translations Grid */}
        <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden h-full">
            <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Languages className="w-5 h-5 text-primary" />
                    {t("translations")}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {translations.map((item) => (
                        <div key={item.lang} className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-zinc-100/50 dark:bg-zinc-900/50 px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                <span className="font-bold text-zinc-700 dark:text-zinc-300">{item.label}</span>
                                <span className="text-xs font-mono font-bold text-zinc-400 uppercase">{item.lang}</span>
                            </div>
                            <div className="p-4">
                                <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                                    <Type className="w-3 h-3" />
                                    {t("name")}
                                </span>
                                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                    {item.data?.name || <span className="text-zinc-400 font-normal">-</span>}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Permissions List */}
        <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden h-full flex flex-col">
            <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    {t("permissions")}
                </CardTitle>
                <Badge variant="secondary" className="font-bold">
                    {role.permission?.length || 0}
                </Badge>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto max-h-[600px]">
                {role.permission && role.permission.length > 0 ? (
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {role.permission.map((perm) => (
                            <div key={perm.id} className="p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors flex items-start gap-4">
                                <div className="mt-1">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{perm.title}</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div className="bg-zinc-100/50 dark:bg-zinc-800/50 p-2 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50 flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase flex items-center gap-1">
                                                <LockKeyhole className="w-3 h-3" />
                                                {t("permission_name")}
                                            </span>
                                            <span className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 break-all">{perm.name}</span>
                                        </div>
                                        <div className="bg-zinc-100/50 dark:bg-zinc-800/50 p-2 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50 flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase flex items-center gap-1">
                                                <Type className="w-3 h-3" />
                                                {t("front_name")}
                                            </span>
                                            <span className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 break-all">{perm.front_name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full p-10 text-zinc-400">
                        <Shield className="w-12 h-12 mb-3 opacity-50" />
                        <p className="font-medium text-lg">{t("no_permissions")}</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
