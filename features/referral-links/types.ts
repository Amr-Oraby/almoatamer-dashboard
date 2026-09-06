export interface City {
    id: number;
    name: string;
}

export interface ReferralLink {
    id: number;
    marketer: string;
    city: City | null;
    type: string;
    value: number;
    total: number;
    link: string;
    identifier: string;
}

export interface ReferralLinksResponse {
    data: ReferralLink[];
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

export interface SingleReferralLinkResponse {
    data: ReferralLink;
    status: string;
    message: string;
}
