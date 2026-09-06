export interface NotificationSender {
    id: number;
    name: string;
    email: string;
    phone: string;
    phone_code: string;
    image: string | null;
    is_active: boolean;
    gender: string;
}

export interface NotificationItem {
    id: string;
    sending_time_ago: string;
    created_at: string;
    sending_time: string;
    read_at: string | null;
    is_readed: boolean;
    notify_type: string;
    sender_data: NotificationSender | null;
    umrah_id?: number | null;
    title: string;
    body: string;
    image: string | null;
}

export interface NotificationsResponse {
    data: NotificationItem[];
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
    unread_count: number;
}
