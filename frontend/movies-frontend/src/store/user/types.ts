export type ColorTheme = 'dark' | 'light' | 'dim' | 'auto' | 'black';
export type Language = 'en' | 'dk';

export interface Avatar {
  name: string;
  displayName: string;
  colors: [string, string, string, string, string];
}

export interface AppSettings {
  theme: ColorTheme;
  preferReducedMotion: boolean;
  imageSaturation: number;
  language: Language;
  showOnboarding: boolean; // has the user seen the onboarding screens or chosen to dismiss them, then this is false
  avatar: Avatar;
}

export interface UserState {
  starredIds: string[]; // list of imdbIds
  appSettings: AppSettings;
}

export interface AppSettingPayload {
  key: string;
  val: unknown;
}
