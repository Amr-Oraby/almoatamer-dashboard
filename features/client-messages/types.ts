export interface UserInfo {
    id: number;
    name: string;
    email: string;
    phone: string;
    phone_code: string;
    image: string | null;
}

export interface ClientMessageItem {
    id: number;
    user_info: UserInfo | null;
    name: string;
    email: string;
    phone_code: string;
    phone: string;
    message_text: string;
    created_at: string;
}

export interface ClientMessagesResponse {
    data: ClientMessageItem[];
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

export interface SingleClientMessageResponse {
    data: ClientMessageItem;
    status: string;
    message: string;
}
