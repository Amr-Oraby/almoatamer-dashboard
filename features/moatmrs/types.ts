export interface Moatmr {
    id: number;
    name: string;
    email: string;
    phone: string;
    phone_code: string;
    image: string | null;
    is_active: boolean;
    gender: string;
    country: {
        id: number;
        short_name: string;
        code: string;
        name: string;
        flag: string;
    } | null;
    created_at: string;
    updated_at: string;
    rate: number;
    wallet_balance: number | null;
    wallet_pending_balance: number | null;
    is_available: number;
    locale: string;
    status: string;
    accepted_by_admin: boolean;
}

export interface MoatmrsResponse {
    data: Moatmr[];
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

export interface SingleMoatmrResponse {
    data: Moatmr;
    status: string;
    message: string;
}
