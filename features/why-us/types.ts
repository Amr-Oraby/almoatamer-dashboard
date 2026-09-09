export interface WhyUsLocale {
    title: string | null;
    description: string | null;
}

export interface WhyUsItem {
    id: number;
    icon: string | null;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    en: WhyUsLocale;
    ar: WhyUsLocale;
    fa: WhyUsLocale;
    ms: WhyUsLocale;
    tr: WhyUsLocale;
    iid: WhyUsLocale;
}

export interface WhyUsResponse {
    data: WhyUsItem[];
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

export interface SingleWhyUsResponse {
    data: WhyUsItem;
    status: string;
    message: string;
}
