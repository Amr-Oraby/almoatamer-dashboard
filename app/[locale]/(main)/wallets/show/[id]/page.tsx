"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useWallet } from "@/features/wallets/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Wallet, Banknote, Hourglass, User as UserIcon, Phone, Mail, Hash } from "lucide-react"

export default function WalletDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useWallet(id)
  const t = useTranslations("Wallets")

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

  const wallet = response.data
  const user = wallet.user

  return (
    <div className="space-y-6 pb-10 max-w-4xl mx-auto">
      {/* Header Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 shrink-0">
               <Wallet className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mb-1">{t("wallet_details")}</p>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                {wallet.amount} SAR
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <Hash className="w-4 h-4 text-zinc-400" />
            <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">{t("wallet_id")}: {wallet.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-zinc-100 dark:divide-zinc-800 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Banknote className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase">{t("amount")}</p>
                    <p className="font-black text-emerald-600 dark:text-emerald-400 text-lg">{wallet.amount} SAR</p>
                </div>
            </div>
            <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Hourglass className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase">{t("pending_amount")}</p>
                    <p className="font-black text-amber-600 dark:text-amber-400 text-lg">{wallet.pending_amount} SAR</p>
                </div>
            </div>
        </div>
      </Card>

      {/* User Info Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="bg-zinc-50/50 dark:bg-zinc-900/50 p-4 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-primary" />
                {t("user_info")}
            </h2>
        </div>
        <CardContent className="p-6">
          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{user.name}</h3>
                  <p className="text-sm text-zinc-500 font-medium capitalize">{user.gender}</p>
                </div>
              </div>

              <div className="space-y-3 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span dir="ltr" className="font-medium">{user.phone ? `+${user.phone_code} ${user.phone}` : "-"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span className="font-medium break-all">{user.email || "-"}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-zinc-400">
              <UserIcon className="w-12 h-12 mb-3 opacity-50" />
              <p className="font-medium text-lg">{t("no_user")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
