import { MutationTree } from 'vuex';
import { AppLayoutSizeWidth, AppState } from './types';

export enum AppMutations {
  SET_LAYOUT_WIDTH = 'SET_LAYOUT_WIDTH',
  SET_ANNOUNCE_MESSAGE = 'SET_ANNOUNCE_MESSAGE',
}

export const mutations: MutationTree<AppState> = {
  [AppMutations.SET_LAYOUT_WIDTH](state, size: AppLayoutSizeWidth) {
    state.layoutSizeWidth = size;
  },
  [AppMutations.SET_ANNOUNCE_MESSAGE](state, message: string) {
    state.announceMessage = message;
  },
};
