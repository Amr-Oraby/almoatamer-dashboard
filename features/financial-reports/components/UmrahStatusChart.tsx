"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UmrahStatusSummaryItem } from "../types"
import { useTranslations } from "next-intl"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

interface UmrahStatusChartProps {
    data: UmrahStatusSummaryItem[];
}

export function UmrahStatusChart({ data }: UmrahStatusChartProps) {
    const t = useTranslations("FinancialReports")

    // Filter out 'total' since it will skew the chart
    const chartData = data
        .filter(item => item.key !== 'total')
        .map(item => ({
            name: t(item.key as any) || item.key,
            value: item.value
        }))

    const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#6366f1', '#8b5cf6', '#ef4444'];

    return (
        <Card className="col-span-1 border-none shadow-md bg-white dark:bg-zinc-900 overflow-hidden">
            <CardHeader>
                <CardTitle>{t("umrah_status")}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full mt-4 flex items-center justify-center">
                    {chartData.every(d => d.value === 0) ? (
                        <div className="text-zinc-500">{t("no_data")}</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%" dir="ltr">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
