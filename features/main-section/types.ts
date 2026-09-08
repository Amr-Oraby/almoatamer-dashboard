export interface LocalizedInfo {
  info: string | null;
}

export interface MainSectionData {
  image: string | null;
  type: string | null;
  en: LocalizedInfo | null;
  ar: LocalizedInfo | null;
  fa: LocalizedInfo | null;
  ms: LocalizedInfo | null;
  tr: LocalizedInfo | null;
  iid: LocalizedInfo | null;
}

export interface MainSectionResponse {
  status: string;
  message: string;
  data: MainSectionData;
}
