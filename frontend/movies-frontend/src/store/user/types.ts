export type ColorTheme = 'dark' | 'light';
export type Language = 'en' | 'dk';

export interface Avatar {
  name: string;
  colors: [string, string, string, string, string];
}

export interface UserState {
  starred: string[]; // list of imdbIds
  theme: ColorTheme;
  preferReducedMotion: boolean;
  imageSaturation: number;
  language: Language;
  showOnboarding: boolean; // has the user seen the onboarding screens or chosen to dismiss them, then this is false
  avatar: Avatar;
}
