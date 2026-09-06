"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useCouponCodeGroup } from "@/features/coupon-codes/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, User, Phone, Ticket, CalendarCheck, CalendarDays, CheckCircle2, XCircle } from "lucide-react"

export default function CouponCodesDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: response, isLoading, isError } = useCouponCodeGroup(id)
  const t = useTranslations("CouponCodes")

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

  const group = response.data
  const sender = group.sender

  return (
    <div className="space-y-6 pb-10 max-w-6xl mx-auto">
      {/* Sender Info Card */}
      <Card className="rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden bg-white dark:bg-zinc-950">
        <div className="p-6">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">{t("sender_info")}</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 shrink-0">
               <User className="h-8 w-8 text-primary" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase mb-1">الاسم</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{sender.name || t("no_name")}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase mb-1">رقم الهاتف</p>
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <span dir="ltr">{sender.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Codes List */}
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 px-1">{t("codes_list")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sender.codes.map((codeDetail) => (
                <Card key={codeDetail.id} className="rounded-xl border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between p-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                            <Ticket className="w-5 h-5 text-primary" />
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 tracking-wider">
                                {codeDetail.code}
                            </span>
                        </div>
                        <Badge variant={codeDetail.is_active ? "default" : "secondary"} className="rounded-lg text-xs px-2 py-0.5">
                            {codeDetail.is_active ? t("active") : t("inactive")}
                        </Badge>
                    </div>
                    
                    <CardContent className="p-4 flex-1 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-zinc-500">{t("discount_amount")}</span>
                            <span className="text-base font-black text-primary">{codeDetail.discount_amount} SAR</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-zinc-500">{t("status")}</span>
                            <div className="flex items-center gap-1.5">
                                {codeDetail.is_used ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-zinc-400" />
                                )}
                                <span className={`text-sm font-bold ${codeDetail.is_used ? 'text-green-600' : 'text-zinc-500'}`}>
                                    {codeDetail.is_used ? t("used") : t("not_used")}
                                </span>
                            </div>
                        </div>

                        {codeDetail.is_used && codeDetail.used_by && (
                            <div className="flex flex-col gap-1 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                <span className="text-xs font-bold text-zinc-400 uppercase">{t("used_by")}</span>
                                <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    <User className="w-4 h-4 text-zinc-400" />
                                    <span>{codeDetail.used_by}</span>
                                </div>
                            </div>
                        )}

                        {codeDetail.used_at && (
                            <div className="flex flex-col gap-1 pt-2">
                                <span className="text-xs font-bold text-zinc-400 uppercase">{t("used_at")}</span>
                                <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    <CalendarCheck className="w-4 h-4 text-zinc-400" />
                                    <span>{codeDetail.used_at}</span>
                                </div>
                            </div>
                        )}
                        
                        {!codeDetail.is_used && (
                            <div className="flex flex-col gap-1 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                <span className="text-xs font-bold text-zinc-400 uppercase">تاريخ الانشاء</span>
                                <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    <CalendarDays className="w-4 h-4 text-zinc-400" />
                                    <span>{codeDetail.created_at}</span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
