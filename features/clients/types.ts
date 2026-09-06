import { Umrah } from "@/features/umrahs/types";

export interface ClientCountry {
    id: number;
    short_name: string;
    code: string;
    name: string;
    nationality_name: string;
    flag: string;
}

export interface Client {
    id: number;
    name: string;
    email: string | null;
    image: string | null;
    phone: string | null;
    phone_code: string | null;
    country: ClientCountry | null;
    locale: string | null;
    is_active: number | boolean;
    longitude: string | number | null;
    latitude: string | number | null;
    gender: string | null;
    created_at: string;
    updated_at: string;
    umrahs?: Umrah[];
}

export interface ClientsResponse {
    data: Client[];
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

export interface SingleClientResponse {
    data: Client;
    status: string;
    message: string;
}
