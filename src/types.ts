export interface SpeechSettings {
  rate: number;
  pitch: number;
  volume: number;
  autoScroll: boolean;
  autoNext: boolean;
}

export interface Language {
  code: string;
  name: string;
}

export type Tab = 'text' | 'url' | 'file';