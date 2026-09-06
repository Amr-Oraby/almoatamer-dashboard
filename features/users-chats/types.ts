export interface ChatParticipant {
    id: number;
    name: string;
    email: string;
    phone: string;
    phone_code: string;
    image: string | null;
    is_active: boolean;
    gender: string;
}

export interface LastMessage {
    id: number;
    message: string;
    message_type: string;
    agoTime: string;
    sent_at: string;
}

export interface UserChatItem {
    id: number;
    receiver: ChatParticipant;
    sender: ChatParticipant;
    last_message: LastMessage | null;
    unread_messages_count: number;
}

export interface UsersChatsResponse {
    data: UserChatItem[];
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

export interface SingleUserChatResponse {
    data: UserChatItem;
    status: string;
    message: string;
}
