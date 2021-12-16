import { MutationTree } from 'vuex';
import { PWAState } from './types';

export enum PWAMutations {
  TOGGLE_OVERLAY = 'TOGGLE_OVERLAY',
  HIDE_INSTALL_BUTTON = 'HIDE_INSTALL_BUTTON',
  SET_DEFERRED_PROMPT = 'SET_DEFERRED_PROMPT',
}

export const mutations: MutationTree<PWAState> = {
  [PWAMutations.TOGGLE_OVERLAY](state) {
    state.showPWAOverlay = !state.showPWAOverlay;
  },
  [PWAMutations.HIDE_INSTALL_BUTTON](state) {
    state.launchedAsPWA = true;
  },
  [PWAMutations.SET_DEFERRED_PROMPT](state, prompt: () => void) {
    state.deferredPrompt = prompt;
  },
};
