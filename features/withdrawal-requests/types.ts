export interface WithdrawalUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    phone_code: string;
    image: string | null;
    is_active: boolean;
    gender: string;
}

export interface WithdrawalRequestItem {
    id: number;
    amount: number;
    status: string;
    bank_name: string | null;
    account_number: string | null;
    user: WithdrawalUser | null;
    can_modify: boolean;
    created_at: string;
    acceptance_rejection_action: string | null;
}

export interface WithdrawalRequestsResponse {
    data: WithdrawalRequestItem[];
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

