import { WithdrawalRequestItem } from "@/features/withdrawal-requests/types";
import { Umrah } from "@/features/umrahs/types";

export interface OrdersSummary {
    total_income: number;
    total_profits: number;
    receivables_motamers: number;
    pending_amounts: number;
    total_withdrawals: number;
}

export interface MonthlyFlowGraphItem {
    date: string;
    from: string;
    to: string;
    total_umrah_prices: number;
    total_withdrawals: number;
    total_profit: number;
}

export interface MonthlyFlow {
    today_income: number;
    today_orders: number;
    graph: MonthlyFlowGraphItem[];
}

export interface UmrahStatusSummaryItem {
    key: string;
    value: number;
}

export interface PendingUmrahs {
    count: number;
    percentage: number;
    amount: number;
}

export interface UmrahSummary {
    umrahs: Partial<Umrah>[];
    withdrawl_requests: WithdrawalRequestItem[];
}

export interface FinancialReportsData {
    orders_summary: OrdersSummary;
    monthly_flow: MonthlyFlow;
    umrah_status_summary: UmrahStatusSummaryItem[];
    pending_umrahs: PendingUmrahs;
    umrah_summary: UmrahSummary;
}

export interface FinancialReportsResponse {
    status: boolean;
    message: string;
    data: FinancialReportsData;
}

export interface FinancialReportsFineResponse {
    total_income: number;
    total_withdrawals: number;
    today_income: number;
    today_withdrawals: number;
    yesterday_income: number;
    yesterday_withdrawals: number;
    current_year_income: number;
    current_year_withdrawals: number;
    last_week_income: number;
    last_week_withdrawals: number;
    last_month_income: number;
    last_month_withdrawals: number;
    last_year_income: number;
    last_year_withdrawals: number;
}
