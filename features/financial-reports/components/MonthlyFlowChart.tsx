"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonthlyFlow } from "../types"
import { useTranslations } from "next-intl"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

interface MonthlyFlowChartProps {
    data: MonthlyFlow;
}

export function MonthlyFlowChart({ data }: MonthlyFlowChartProps) {
    const t = useTranslations("FinancialReports")

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'SAR',
            maximumFractionDigits: 0
        }).format(value)
    }

    // Sort graph by date just in case
    const sortedGraph = [...(data?.graph || [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return (
        <Card className="col-span-1 md:col-span-2 border-none shadow-md bg-white dark:bg-zinc-900 overflow-hidden">
            <CardHeader>
                <CardTitle>{t("monthly_flow")}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full mt-4" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sortedGraph} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorWithdrawal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis 
                                dataKey="date" 
                                stroke="#888888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => {
                                    if (!value) return "";
                                    const date = new Date(value);
                                    return `${date.getDate()}/${date.getMonth() + 1}`;
                                }}
                            />
                            <YAxis 
                                stroke="#888888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => formatCurrency(Number(value))} 
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                            <Tooltip 
                                formatter={(value: any) => formatCurrency(Number(value))}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend />
                            <Area type="monotone" dataKey="total_umrah_prices" name={t("umrah_prices")} stroke="#3b82f6" fillOpacity={1} fill="url(#colorIncome)" />
                            <Area type="monotone" dataKey="total_profit" name={t("profit")} stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" />
                            <Area type="monotone" dataKey="total_withdrawals" name={t("withdrawals")} stroke="#ef4444" fillOpacity={1} fill="url(#colorWithdrawal)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
