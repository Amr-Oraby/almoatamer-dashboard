"use client"

import { useTranslations } from "next-intl"
import { useFinancialReports, useFinancialReportsFine } from "@/features/financial-reports/hooks"
import { SummaryCards } from "@/features/financial-reports/components/SummaryCards"
import { MonthlyFlowChart } from "@/features/financial-reports/components/MonthlyFlowChart"
import { UmrahStatusChart } from "@/features/financial-reports/components/UmrahStatusChart"
import { FinancialDetails } from "@/features/financial-reports/components/FinancialDetails"
import { FinancialWithdrawalRequestsTable } from "@/features/financial-reports/components/FinancialWithdrawalRequestsTable"
import { Loader2 } from "lucide-react"

export default function FinancialReportsPage() {
    const t = useTranslations("FinancialReports")
    const { data: reportsData, isLoading: reportsLoading, isError: reportsError } = useFinancialReports()
    const { data: fineData, isLoading: fineLoading, isError: fineError } = useFinancialReportsFine()

    const isLoading = reportsLoading || fineLoading
    const isError = reportsError || fineError

    return (
        <div className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
                <div className="flex flex-col gap-2 p-6 pb-0">
                    <h1 className="text-2xl font-bold">{t("title")}</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">{t("subtitle")}</p>
                </div>

                <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
                        </div>
                    ) : isError ? (
                        <div className="flex justify-center items-center h-64 text-red-500">
                            {t("no_data")}
                        </div>
                    ) : (
                        <>
                            {/* Summary Cards */}
                            {reportsData?.data?.orders_summary && (
                                <SummaryCards data={reportsData.data.orders_summary} />
                            )}

                            {/* Middle Section: Details and Charts */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-6">
                                    {reportsData?.data?.monthly_flow && (
                                        <MonthlyFlowChart data={reportsData.data.monthly_flow} />
                                    )}
                                </div>

                                <div className="col-span-1 space-y-6">
                                    {reportsData?.data?.umrah_status_summary && (
                                        <UmrahStatusChart data={reportsData.data.umrah_status_summary} />
                                    )}
                                </div>
                            </div>

                            {/* Fine Details */}
                            {fineData && (
                                <div className="grid grid-cols-1">
                                    <FinancialDetails data={fineData} />
                                </div>
                            )}

                            {/* Withdrawal Requests Table */}
                            {reportsData?.data?.umrah_summary?.withdrawl_requests && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                        {t("withdrawal_requests")}
                                    </h3>
                                    <FinancialWithdrawalRequestsTable
                                        data={reportsData.data.umrah_summary.withdrawl_requests}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
    )
}
