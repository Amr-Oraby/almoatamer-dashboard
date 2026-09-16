"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrdersSummary } from "../types"
import { useTranslations } from "next-intl"
import { CircleDollarSign, TrendingUp, Clock, Wallet, Banknote } from "lucide-react"

interface SummaryCardsProps {
    data: OrdersSummary;
}

export function SummaryCards({ data }: SummaryCardsProps) {
    const t = useTranslations("FinancialReports")

    const cards = [
        {
            title: t("total_income"),
            value: data.total_income,
            icon: CircleDollarSign,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            title: t("total_profits"),
            value: data.total_profits,
            icon: TrendingUp,
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10"
        },
        {
            title: t("pending_amounts"),
            value: data.pending_amounts,
            icon: Clock,
            color: "text-amber-500",
            bgColor: "bg-amber-500/10"
        },
        {
            title: t("total_withdrawals"),
            value: data.total_withdrawals,
            icon: Wallet,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10"
        },
        {
            title: t("receivables"),
            value: data.receivables_motamers,
            icon: Banknote,
            color: "text-rose-500",
            bgColor: "bg-rose-500/10"
        }
    ]

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'SAR'
        }).format(value)
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {cards.map((card, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md bg-white dark:bg-zinc-900 transition-all hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            {card.title}
                        </CardTitle>
                        <div className={`p-2 rounded-full ${card.bgColor}`}>
                            <card.icon className={`h-4 w-4 ${card.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white" dir="ltr">
                            {formatCurrency(card.value)}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
