export interface FaqTranslation {
    question: string | null;
    answer: string | null;
}

export interface FaqItem {
    id: number;
    en: FaqTranslation | null;
    ar: FaqTranslation | null;
    fa: FaqTranslation | null;
    ms: FaqTranslation | null;
    tr: FaqTranslation | null;
    iid: FaqTranslation | null;
    question: string;
    answer: string;
    created_at: string;
    updated_at: string;
}

export interface FaqResponse {
    data: FaqItem[];
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

export interface SingleFaqResponse {
    data: FaqItem;
    status: string;
    message: string;
}
