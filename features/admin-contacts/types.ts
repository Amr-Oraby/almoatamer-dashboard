export interface AdminContactData {
    phone: string | null;
    phone_code: string | null;
    gmail: string | null;
    facebook: string | null;
    twitter: string | null;
    linkedin: string | null;
    instagram: string | null;
    behance: string | null;
    youtube: string | null;
    google_play: string | null;
    app_store: string | null;
    tiktok: string | null;
    snapchat: string | null;
    insta_pay: string | null;
}

export interface AdminContactResponse {
    status: string;
    message: string;
    data: AdminContactData;
}

export interface AdminContactUpdateResponse {
    status: string;
    message: string;
    data: null;
}

export type AdminContactUpdateRequest = AdminContactData;
