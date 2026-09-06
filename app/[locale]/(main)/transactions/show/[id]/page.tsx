"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useTransaction } from "@/features/transactions/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Receipt, User as UserIcon, Phone, Mail, Hash, Calendar, Banknote, Landmark, Percent, ReceiptText } from "lucide-react"

export default function TransactionDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useTransaction(id)
  const t = useTranslations("Transactions")

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

  const transaction = response.data
  const { user, moatmer } = transaction

  const PersonCard = ({ person, title, notFoundText }: { person: any, title: string, notFoundText: string }) => (
    <Card className="border-zinc-100 dark:border-zinc-800 shadow-sm h-full">
      <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-primary" />
            {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {person ? (
            <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                        {person.image ? (
                            <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon className="w-8 h-8 text-primary" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{person.name}</h3>
                        <p className="text-sm text-zinc-500 font-medium capitalize">{person.gender}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span dir="ltr" className="font-medium">{person.phone ? `+${person.phone_code} ${person.phone}` : "-"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span className="font-medium break-all">{person.email || "-"}</span>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-40 text-zinc-400">
                <UserIcon className="w-12 h-12 mb-2 opacity-50" />
                <p className="font-medium">{notFoundText}</p>
            </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6 pb-10 max-w-6xl mx-auto">
      {/* Header */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 shrink-0">
               <Receipt className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mb-1">{t("transaction_details")}</p>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                {transaction.title || "-"}
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-zinc-100 dark:divide-zinc-800 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="p-4 flex items-center gap-3">
                <Hash className="w-5 h-5 text-zinc-400" />
                <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase">{t("transaction_id")}</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">{transaction.transaction_id || "-"}</p>
                </div>
            </div>
            <div className="p-4 flex items-center gap-3">
                <Hash className="w-5 h-5 text-zinc-400" />
                <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase">{t("umrah_id")}</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">{transaction.umrah_id || "-"}</p>
                </div>
            </div>
            <div className="p-4 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-zinc-400" />
                <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase">{t("date")}</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">{transaction.date || "-"}</p>
                </div>
            </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
        {/* Users Column */}
        <div className="lg:col-span-1 space-y-6">
            <PersonCard person={user} title={t("user")} notFoundText={t("no_user")} />
            <PersonCard person={moatmer} title={t("moatmer")} notFoundText={t("no_moatmer")} />
        </div>

        {/* Financials & Bank Info Column */}
        <div className="lg:col-span-2 space-y-6">
            {/* Financials Card */}
            <Card className="border-zinc-100 dark:border-zinc-800 shadow-sm h-full">
                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Banknote className="w-5 h-5 text-primary" />
                        {t("financials")}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                <Banknote className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold mb-0.5">{t("price")}</p>
                                <p className="text-lg font-black text-zinc-900 dark:text-zinc-100">{transaction.price} SAR</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                                <ReceiptText className="w-5 h-5 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold mb-0.5">{t("vat")}</p>
                                <p className="text-lg font-black text-zinc-900 dark:text-zinc-100">{transaction.vat} SAR</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                <Percent className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold mb-0.5">{t("discount")}</p>
                                <p className="text-lg font-black text-red-500">{transaction.discount || 0} SAR</p>
                            </div>
                        </div>

                        <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/20 flex items-center gap-4 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                                <Banknote className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-primary font-bold mb-0.5 uppercase tracking-wider">{t("total")}</p>
                                <p className="text-2xl font-black text-primary">{transaction.total} SAR</p>
                            </div>
                        </div>
                    </div>

                    {/* Bank Info */}
                    <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                            <Landmark className="w-4 h-4 text-zinc-500" />
                            {t("bank_info")}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-zinc-400 uppercase">{t("bank_name")}</span>
                                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{transaction.bank_name || "-"}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-zinc-400 uppercase">{t("account_number")}</span>
                                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 tracking-wider font-mono">{transaction.account_number || "-"}</span>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
