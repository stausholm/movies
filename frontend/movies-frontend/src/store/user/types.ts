export type ColorTheme = 'dark' | 'light' | 'dim' | 'auto' | 'black';
export type Language = 'en' | 'dk';
export type AppSettingPropertyKey =
  | 'theme'
  | 'preferReducedMotion'
  | 'buttonClicks'
  | 'imageSaturation'
  | 'language'
  | 'showOnboarding'
  | 'avatar'
  | 'devmode'
  | '_devmodeShowWireframe'
  | '_devmodeEnableLogs'
  | 'buttonClicksActiveReward';

export interface Avatar {
  name: string;
  displayName: string;
  colors: [string, string, string, string, string];
}

export type buttonClickRewardId =
  | 'partyCone'
  | 'pirateBicorne'
  | 'vikingHelmet'
  | 'santaHat'
  | 'topHat'
  | 'wizard'
  | 'crown';

export interface AppSettings {
  theme: ColorTheme;
  preferReducedMotion: boolean;
  buttonClicks: number;
  buttonClicksActiveReward: null | buttonClickRewardId;
  imageSaturation: number;
  language: Language;
  showOnboarding: boolean; // has the user seen the onboarding screens or chosen to dismiss them, then this is false
  avatar: Avatar;
  devmode: boolean; // is devmode enabled
  _devmodeShowWireframe: boolean;
  _devmodeEnableLogs: boolean;
}

export interface UserState {
  starredIds: string[]; // list of imdbIds
  appSettings: AppSettings;
  appLaunches: number;
}

export interface AppSettingPayload {
  key: AppSettingPropertyKey;
  val: unknown;
}
