export interface CountryTranslation {
    name: string | null;
    nationality_name: string | null;
}

export interface CountryItem {
    id: number;
    short_name: string;
    phone_length: number;
    code: string;
    flag: string;
    en: CountryTranslation | null;
    ar: CountryTranslation | null;
    fa: CountryTranslation | null;
    ms: CountryTranslation | null;
    tr: CountryTranslation | null;
    iid: CountryTranslation | null;
}

export interface CountriesResponse {
    data: CountryItem[];
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

export interface SingleCountryResponse {
    data: CountryItem;
    status: string;
    message: string;
}
