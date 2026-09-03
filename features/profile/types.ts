export interface Country {
  id: number;
  name: string;
  short_name: string;
  code: string;
  flag: string;
  nationality_name: string;
  max_length: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: number;
  name: string;
  email: string;
  phone: string;
  phone_code: string;
  image: string | null;
  gender: string | null;
  latitude: number | null;
  longitude: number | null;
  is_active: boolean;
  country: Country | null;
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileResponse {
  data: Profile;
  status: string;
  message: string;
}

export type UpdateProfilePayload = any;
