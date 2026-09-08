export interface LocalizedInfo {
  info: string | null;
}

export interface FooterData {
  type: string | null;
  en: LocalizedInfo | null;
  ar: LocalizedInfo | null;
  fa: LocalizedInfo | null;
  ms: LocalizedInfo | null;
  tr: LocalizedInfo | null;
  iid: LocalizedInfo | null;
}

export interface FooterResponse {
  status: string;
  message: string;
  data: FooterData;
}
