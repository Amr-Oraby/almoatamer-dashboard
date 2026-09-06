export interface HomeBanner {
    id: number;
    is_active: boolean;
    image: string;
}

export interface HomeBannersResponse {
    data: HomeBanner[];
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

export interface SingleHomeBannerResponse {
    data: HomeBanner;
    status: string;
    message: string;
}
