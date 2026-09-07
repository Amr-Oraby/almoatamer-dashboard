export interface HowToStartTranslation {
    title: string | null;
    description: string | null;
}

export interface HowToStartSection {
    en: HowToStartTranslation;
    ar: HowToStartTranslation;
    fa?: HowToStartTranslation;
    ms?: HowToStartTranslation;
    tr?: HowToStartTranslation;
    iid?: HowToStartTranslation;
    id?: number;
    image?: string | null;
    title?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface HowToStartResponse {
    status: string;
    message: string;
    data: {
        how_to_start: HowToStartSection;
        contents: HowToStartSection[];
    };
}
