import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { AppLayoutSizeWidth, AppState } from './types';

export const getters: GetterTree<AppState, RootState> = {
  layoutSizeWidth(state): AppLayoutSizeWidth {
    return state.layoutSizeWidth;
  },
  announceMessage(state): string {
    return state.announceMessage;
  },
  showReleaseNotes(state): boolean {
    return state.usingNewRelease;
  },
};
