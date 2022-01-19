import { Module } from 'vuex';
import { RootState } from '../types';
import { AppSettings, UserState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';
import { getLocalStorageValue } from '@/utils/localStorage';
import { APP_SETTINGS_STORAGE_KEY } from './constants';

export const state: UserState = {
  starredIds: [],
  appSettings: getLocalStorageValue(
    APP_SETTINGS_STORAGE_KEY,
    {
      // default values
      theme: 'auto',
      preferReducedMotion:
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      buttonClicks: 0,
      imageSaturation: 0,
      language: 'en',
      showOnboarding: true,
      avatar: {
        name: 'user@user.com',
        displayName: 'Anon',
        colors: ['#A3A948', '#EDB92E', '#F85931', '#CE1836', '#009989'],
      },
    } as AppSettings,
    true
  ),
};

export const user: Module<UserState, RootState> = {
  state,
  getters,
  mutations,
  //namespaced: true,
};
