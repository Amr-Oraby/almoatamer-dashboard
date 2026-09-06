export interface WhyUsItem {
    id: number;
    icon: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
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
