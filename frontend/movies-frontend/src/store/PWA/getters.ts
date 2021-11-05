import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { PWAState } from './types';

export const getters: GetterTree<PWAState, RootState> = {
  showPWAOverlay(state): boolean {
    return state.showPWAOverlay;
  },
  showPWAInstallButton(state): boolean {
    return !state.launchedAsPWA;
  },
  deferredPrompt(state) {
    return state.deferredPrompt;
  },
};
