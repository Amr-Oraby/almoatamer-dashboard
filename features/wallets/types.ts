export interface WalletUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    phone_code: string;
    image: string | null;
    is_active: boolean;
    gender: string;
}

export interface WalletItem {
    id: number;
    amount: number;
    pending_amount: number;
    user: WalletUser | null;
}

export interface WalletsResponse {
    data: WalletItem[];
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

export interface SingleWalletResponse {
    data: WalletItem;
    status: string;
    message: string;
}
