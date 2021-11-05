import { Module } from 'vuex';
import { RootState } from '../types';
import { PWAState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';

export const state: PWAState = {
  launchedAsPWA: false,
  showPWAOverlay: false,
  deferredPrompt: null,
};

export const PWA: Module<PWAState, RootState> = {
  state,
  getters,
  mutations,
  //namespaced: true,
};
