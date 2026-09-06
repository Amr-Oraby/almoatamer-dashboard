export interface TransactionPerson {
    id: number;
    name: string;
    email: string;
    phone: string;
    phone_code: string;
    image: string | null;
    is_active: boolean;
    gender: string;
}

export interface TransactionItem {
    id: number;
    transaction_id: string | null;
    umrah_id: number | null;
    user: TransactionPerson | null;
    moatmer: TransactionPerson | null;
    bank_name: string | null;
    account_number: string | null;
    price: number;
    vat: number;
    discount: number | null;
    total: number;
    title: string;
    date: string;
    created_at: string;
}

export interface TransactionsResponse {
    data: TransactionItem[];
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

export interface SingleTransactionResponse {
    data: TransactionItem;
    status: string;
    message: string;
}
