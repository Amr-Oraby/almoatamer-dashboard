export interface TimingDay {
    id: number;
    day: number;
    is_open: boolean;
    price: number;
    vat: number;
    app_tax: number;
    total_price: number;
    type: string | null;
}

export interface TimingMonth {
    id: number;
    month: number;
    days: TimingDay[];
}

export interface TimingsResponse {
    status: string;
    message: string;
    data: TimingMonth[];
}
