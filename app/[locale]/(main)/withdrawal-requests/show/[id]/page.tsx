"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useWithdrawalRequest } from "@/features/withdrawal-requests/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Wallet, Banknote, Landmark, User as UserIcon, Calendar, Phone, Mail, Activity, AlertCircle } from "lucide-react"

export default function WithdrawalRequestDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useWithdrawalRequest(id)
  const t = useTranslations("WithdrawalRequests")

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

  const request = response.data
  const user = request.user

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
      case 'completed':
        return 'border-green-500 text-green-600 bg-green-500/10'
      case 'rejected':
      case 'cancelled':
        return 'border-red-500 text-red-600 bg-red-500/10'
      case 'pending':
      default:
        return 'border-yellow-500 text-yellow-600 bg-yellow-500/10'
    }
  }

  return (
    <div className="space-y-6 pb-10 max-w-4xl mx-auto">
      {/* Header Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-6 border-b border-zinc-100 dark:border-zinc-800 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 relative shrink-0">
               <Wallet className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mb-1">{t("request_details")}</p>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                {request.amount} SAR
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-4 py-1.5 rounded-lg text-sm font-bold border ${getStatusColor(request.status)}`}>
              {request.status}
            </span>
            <span className="text-sm font-medium text-zinc-500">#{request.id}</span>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-zinc-100 dark:divide-zinc-800">
            
            {/* User & Request Info */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">{t("user_info")}</h2>
                {user ? (
                  <div className="space-y-4 bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                        {user.image ? (
                          <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-zinc-100">{user.name}</p>
                        <p className="text-xs text-zinc-500 capitalize">{user.gender}</p>
                      </div>
                    </div>
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <Phone className="w-4 h-4 text-zinc-400" />
                        <span dir="ltr" className="font-medium">{user.phone ? `+${user.phone_code} ${user.phone}` : "-"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <Mail className="w-4 h-4 text-zinc-400" />
                        <span className="font-medium break-all">{user.email || "-"}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-500">
                    <UserIcon className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm font-medium">{t("no_user")}</p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">{t("request_details")}</h2>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> {t("created_at")}</span>
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{request.created_at || "-"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5"/> {t("can_modify")}</span>
                    <span className={`text-sm font-bold ${request.can_modify ? 'text-primary' : 'text-zinc-500'}`}>{request.can_modify ? "نعم" : "لا"}</span>
                  </div>
                  {request.acceptance_rejection_action && (
                    <div className="flex flex-col gap-1 pt-2">
                      <span className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-1.5"><Activity className="w-3.5 h-3.5"/> {t("action")}</span>
                      <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg">{request.acceptance_rejection_action}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bank Info */}
            <div className="p-6 bg-zinc-50/30 dark:bg-zinc-900/30">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-primary" />
                  {t("bank_info")}
              </h2>
              
              <div className="space-y-4">
                  <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                      <p className="text-xs font-bold text-zinc-500 uppercase mb-1">{t("bank_name")}</p>
                      <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                          {request.bank_name || "-"}
                      </p>
                  </div>

                  <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                      <p className="text-xs font-bold text-zinc-500 uppercase mb-1">{t("account_number")}</p>
                      <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-zinc-400" />
                          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-widest font-mono">
                              {request.account_number || "-"}
                          </p>
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
