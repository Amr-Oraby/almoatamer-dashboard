export interface BlogImage {
    id: number;
    blog_id: number;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface BlogItem {
    id: number;
    title: string;
    description: string;
    slug: string;
    alt: string | null;
    canonical?: string;
    short_desc?: string;
    keywords?: string;
    is_active: boolean;
    images: BlogImage | null;
}

export interface BlogsResponse {
    data: BlogItem[];
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

export interface SingleBlogResponse {
    data: BlogItem;
    status: string;
    message: string;
}
