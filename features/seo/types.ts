export interface SeoItem {
    id: number;
    title: string;
    seoable_type: string;
    is_active: boolean;
}

export interface SeoResponse {
    data: SeoItem[];
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

export interface SingleSeoResponse {
    data: SeoItem;
    status: string;
    message: string;
}
