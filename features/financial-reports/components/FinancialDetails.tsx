"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FinancialReportsFineResponse } from "../types"
import { useTranslations } from "next-intl"

interface FinancialDetailsProps {
    data: FinancialReportsFineResponse;
}

export function FinancialDetails({ data }: FinancialDetailsProps) {
    const t = useTranslations("FinancialReports")

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'SAR'
        }).format(value)
    }

    const periods = [
        { label: t("today"), income: data.today_income, withdrawals: data.today_withdrawals },
        { label: t("yesterday"), income: data.yesterday_income, withdrawals: data.yesterday_withdrawals },
        { label: t("last_week"), income: data.last_week_income, withdrawals: data.last_week_withdrawals },
        { label: t("last_month"), income: data.last_month_income, withdrawals: data.last_month_withdrawals },
        { label: t("current_year"), income: data.current_year_income, withdrawals: data.current_year_withdrawals },
        { label: t("last_year"), income: data.last_year_income, withdrawals: data.last_year_withdrawals },
    ]

    return (
        <Card className="col-span-1 md:col-span-3 border-none shadow-md bg-white dark:bg-zinc-900">
            <CardHeader>
                <CardTitle>{t("financial_details")}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {periods.map((period, idx) => (
                        <div key={idx} className="flex flex-col space-y-2 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{period.label}</span>
                            <div className="flex flex-col space-y-1">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-zinc-500 dark:text-zinc-400">{t("income")}:</span>
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400" dir="ltr">{formatCurrency(period.income)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-zinc-500 dark:text-zinc-400">{t("withdrawals")}:</span>
                                    <span className="font-bold text-rose-600 dark:text-rose-400" dir="ltr">{formatCurrency(period.withdrawals)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
