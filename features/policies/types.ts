export interface PolicyTranslation {
    title: string | null;
    desc: string | null;
}

export interface PolicyItem {
    id: number;
    en: PolicyTranslation | null;
    ar: PolicyTranslation | null;
    fa: PolicyTranslation | null;
    ms: PolicyTranslation | null;
    tr: PolicyTranslation | null;
    iid: PolicyTranslation | null;
    is_active: number;
    created_at: string;
    updated_at: string;
}

export interface PoliciesResponse {
    data: PolicyItem[];
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

export interface SinglePolicyResponse {
    data: PolicyItem;
    status: string;
    message: string;
}
