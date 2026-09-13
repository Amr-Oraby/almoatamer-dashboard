export interface PermissionTranslation {
    title: string | null;
}

export interface PermissionItem {
    id: number;
    name: string;
    front_name: string;
    title: string;
    en: PermissionTranslation | null;
    ar: PermissionTranslation | null;
    fa: PermissionTranslation | null;
    ms: PermissionTranslation | null;
    tr: PermissionTranslation | null;
    iid: PermissionTranslation | null;
}

export interface PermissionsResponse {
    data: PermissionItem[];
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

export interface MyPermissionsResponse {
    data: PermissionItem[];
}

export type AllPermissionsResponse = Record<string, PermissionItem[]>;
