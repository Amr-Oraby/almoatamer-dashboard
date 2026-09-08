export interface LocalizedInfo {
  info: string | null;
}

export interface WhoIsAlmuatamerData {
  image: string | null;
  type: string | null;
  en: LocalizedInfo | null;
  ar: LocalizedInfo | null;
  fa: LocalizedInfo | null;
  ms: LocalizedInfo | null;
  tr: LocalizedInfo | null;
  iid: LocalizedInfo | null;
}

export interface WhoIsAlmuatamerResponse {
  status: string;
  message: string;
  data: WhoIsAlmuatamerData;
}
