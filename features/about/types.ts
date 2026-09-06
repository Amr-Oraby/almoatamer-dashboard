export interface AboutTranslation {
    title: string | null;
    desc: string | null;
    slug: string | null;
}

export interface AboutItem {
    id: number;
    en: AboutTranslation | null;
    ar: AboutTranslation | null;
    fa: AboutTranslation | null;
    ms: AboutTranslation | null;
    tr: AboutTranslation | null;
    iid: AboutTranslation | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface AboutResponse {
    data: AboutItem[];
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

export interface SingleAboutResponse {
    data: AboutItem | AboutItem[];
    status: string;
    message: string;
}
