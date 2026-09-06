export interface TermsTranslation {
    title: string | null;
    desc: string | null;
}

export interface TermItem {
    id: number;
    en: TermsTranslation | null;
    ar: TermsTranslation | null;
    fa: TermsTranslation | null;
    ms: TermsTranslation | null;
    tr: TermsTranslation | null;
    iid: TermsTranslation | null;
    is_active: number;
    created_at: string;
    updated_at: string;
}

export interface TermsResponse {
    data: TermItem[];
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

export interface SingleTermResponse {
    data: TermItem;
    status: string;
    message: string;
}
