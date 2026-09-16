export interface ChatUser {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    phone_code: string | null;
    image: string | null;
    is_active: boolean;
    gender: string | null;
}

export interface LastMessage {
    id: number;
    message: string;
    message_type: string;
    agoTime: string;
    sent_at: string;
}

export interface Conversation {
    id: number;
    receiver: ChatUser;
    sender: ChatUser;
    last_message: LastMessage | null;
    unread_messages_count: number;
}

export interface GetConversationsResponse {
    status: string;
    message: string;
    data: Conversation[];
}

export interface ChatMessage {
    id: number;
    message: string;
    message_type: string;
    sender_id?: number;
    receiver_id?: number;
    type: "me" | "other";
    is_read?: boolean;
    created_at: string;
}

export interface ChatDetails {
    id: number;
    sender_id: number;
    umrah_id: number | null;
    created_at: string;
    updated_at: string;
    sender: ChatUser;
    receiver_id: number;
    receiver: ChatUser;
    messages: ChatMessage[];
}

export interface GetChatResponse {
    status: string;
    message: string;
    data: ChatDetails;
}
