export interface LanguageTranslation {
    name: string | null;
}

export interface LanguageItem {
    id: number;
    short_name: string;
    flag: string;
    en: LanguageTranslation | null;
    ar: LanguageTranslation | null;
    fa: LanguageTranslation | null;
    ms: LanguageTranslation | null;
    tr: LanguageTranslation | null;
    iid: LanguageTranslation | null;
}

export interface LanguagesResponse {
    data: LanguageItem[];
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

export interface SingleLanguageResponse {
    data: LanguageItem;
    status: string;
    message: string;
}
