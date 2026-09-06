export interface RoleTranslation {
    name: string | null;
}

export interface Permission {
    id: number;
    title: string;
    front_name: string;
    name: string;
}

export interface RoleItem {
    id: number;
    is_active: boolean;
    en: RoleTranslation | null;
    ar: RoleTranslation | null;
    fa: RoleTranslation | null;
    ms: RoleTranslation | null;
    tr: RoleTranslation | null;
    iid: RoleTranslation | null;
    permission: Permission[];
}

export interface RolesResponse {
    data: RoleItem[];
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

export type SingleRoleResponse = RoleItem;
