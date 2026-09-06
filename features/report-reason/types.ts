export interface ReportReasonTranslation {
    name: string | null;
}

export interface ReportReasonItem {
    id: number;
    en: ReportReasonTranslation | null;
    ar: ReportReasonTranslation | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface ReportReasonsResponse {
    data: ReportReasonItem[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
    status: string;
    message: string;
}

export interface SingleReportReasonResponse {
    data: ReportReasonItem;
    status: string;
    message: string;
}
