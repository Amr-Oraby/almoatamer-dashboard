export interface ThankingWord {
    id: number;
    name: string;
    image: string;
    is_active: boolean;
    text: string;
    date: string;
}

export interface ThankingWordsResponse {
    data: ThankingWord[];
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

export interface SingleThankingWordResponse {
    data: ThankingWord;
    status: string;
    message: string;
}
