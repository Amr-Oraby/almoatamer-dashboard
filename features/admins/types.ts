import { RoleItem } from "@/features/roles/types";

export interface AdminItem {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_active: boolean;
    phone_code: string;
    gender: string;
    image: string;
    role: RoleItem | null;
    created_at: string;
    updated_at: string;
}

export interface AdminsResponse {
    data: AdminItem[];
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

export interface SingleAdminResponse {
    data: AdminItem;
    status: string;
    message: string;
}
