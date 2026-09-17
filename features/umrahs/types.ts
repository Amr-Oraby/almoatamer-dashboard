export interface UmrahClient {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  phone_code: string | null;
  image: string | null;
  is_active: boolean;
  gender: string | null;
}

export interface UmrahMoatmer {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  phone_code: string | null;
  image: string | null;
  is_active: boolean;
  gender: string | null;
  rate?: number;
  wallet_balance?: number;
  wallet_pending_balance?: number;
}

export interface UmrahLanguage {
  id: number;
  short_name: string;
  flag: string | null;
  en: { name: string | null };
  ar: { name: string | null };
  fa: { name: string | null };
  ms: { name: string | null };
  tr: { name: string | null };
  iid: { name: string | null };
}

export interface TwafData {
  date: string | null;
  twaf_num: number;
}

export interface QuestData {
  date: string | null;
  quest_num: number;
}

export interface UmrahCycleStep {
  id: number;
  key: string;
  date: string | null;
  media: string | null;
  title: string | null;
  is_done: boolean;
  other_data: TwafData[] | QuestData[] | null;
}

export interface UmrahMedia {
  id: number;
  umrah_id: number;
  step: string | null;
  media: string;
}

export interface Umrah {
  id: number;
  name: string;
  phone_code: string | null;
  phone: string | null;
  date: string;
  unformatted_date: string;
  gender: string | null;
  moatmer: UmrahMoatmer | null;
  recommended_price: number;
  moatamer_price: number;
  price: number;
  discount: number;
  tax_amount: number;
  tax_value: number;
  total_price: number;
  client_rate: number | null;
  moatmer_rate: number | null;
  client: UmrahClient;
  client_total_orders: number;
  language: UmrahLanguage;
  moatmer_appointed: boolean;
  is_paid: boolean;
  umrah_status: string; // 'pending', 'done', etc.
  is_saved_data: boolean;
  transaction_id: string | null;
  relative: { id: number; name: string } | null;
  other_relation: string | null;
  status: { id: number; name: string } | null;
  cycle: UmrahCycleStep[];
  media: UmrahMedia[];
  compatible_moatmers: UmrahMoatmer[];
  order_creation_date: string;
  documented_media: unknown[];
  instapay: string | null;
  created_at: string;
  updated_at: string;
}

export interface UmrahsResponse {
  data: Umrah[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
    path: string;
  };
  status: string;
  message: string;
}

export interface SingleUmrahResponse {
  data: Umrah;
  status: string;
  message: string;
}

export interface UmrahMoatmersResponse {
  data: UmrahMoatmer[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
    path: string;
  };
  status: string;
  message: string;
}
