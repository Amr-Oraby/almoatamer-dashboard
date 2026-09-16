export interface PeriodHistory {
  id: number;
  from: string;
  to: string;
  moatamer_price: number;
  vat: number;
  app_tax: number;
  price: number;
  created_at: string;
}

export interface PeriodHistoriesResponse {
  data: PeriodHistory[];
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
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
  status: string;
  message: string;
}
