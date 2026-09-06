export interface CouponCodeDetail {
    id: number;
    sender: string;
    used_by: string | null;
    code: string;
    discount_amount: number;
    is_active: boolean;
    is_used: boolean;
    used_at: string | null;
    created_at: string;
}

export interface CouponCodeSender {
    id: number;
    name: string;
    phone: string | null;
    codes: CouponCodeDetail[];
}

export interface CouponCodeGroup {
    sender: CouponCodeSender;
}

export interface CouponCodesResponse {
    data: CouponCodeGroup[];
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

