import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { AppSettings, UserState } from './types';

export const getters: GetterTree<UserState, RootState> = {
  getStarredIds(state): string[] {
    return state.starredIds;
  },
  getAppSettings(state): AppSettings {
    return state.appSettings;
  },
  onboardingComplete(state): boolean {
    return !state.appSettings.showOnboarding;
  },
  devmodeEnabled(state): boolean {
    return state.appSettings.devmode;
  },
};
