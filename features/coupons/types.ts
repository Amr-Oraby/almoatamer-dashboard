export interface CouponItem {
    id: number;
    code: string;
    type: string;
    discount_amount: number;
    start_date: string;
    expiry_date: string;
    usage_limit: number;
    times_used: number;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export interface CouponsResponse {
    data: CouponItem[];
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

export interface SingleCouponResponse {
    data: CouponItem;
    status: string;
    message: string;
}
