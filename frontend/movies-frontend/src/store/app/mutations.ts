import { compareVersion } from '@/utils/compareVersion';
import { getLocalStorageValue, setLocalStorageValue } from '@/utils/localStorage';
import { MutationTree } from 'vuex';
import { APP_SETTINGS_VERSION_KEY } from './constants';
import { AppLayoutSizeWidth, AppState } from './types';
import { APP_VERSION } from '@/constants/SiteSettings.json';

export enum AppMutations {
  SET_LAYOUT_WIDTH = 'SET_LAYOUT_WIDTH',
  SET_ANNOUNCE_MESSAGE = 'SET_ANNOUNCE_MESSAGE',
  COMPARE_VERSION_NUMBER = 'COMPARE_VERSION_NUMBER',
  SET_USING_NEW_RELEASE = 'SET_USING_NEW_RELEASE',
  INCREMENT_OVERLAY_COUNT = 'INCREMENT_OVERLAY_COUNT',
  SUBTRACT_OVERLAY_COUNT = 'SUBTRACT_OVERLAY_COUNT',
  DISABLE_NAVIGATION = 'DISABLE_NAVIGATION',
  ENABLE_NAVIGATION = 'ENABLE_NAVIGATION',
}

export const mutations: MutationTree<AppState> = {
  [AppMutations.SET_LAYOUT_WIDTH](state, size: AppLayoutSizeWidth) {
    state.layoutSizeWidth = size;
  },
  [AppMutations.SET_ANNOUNCE_MESSAGE](state, message: string) {
    state.announceMessage = message;
  },
  [AppMutations.COMPARE_VERSION_NUMBER](state) {
    const storedVersion = getLocalStorageValue(APP_SETTINGS_VERSION_KEY);
    const versionIsValid = typeof storedVersion === 'string';

    if (versionIsValid && compareVersion(APP_VERSION, storedVersion)) {
      state.usingNewRelease = true;
    } else {
      state.usingNewRelease = false;
    }
    setLocalStorageValue(APP_SETTINGS_VERSION_KEY, APP_VERSION);
  },
  [AppMutations.SET_USING_NEW_RELEASE](state, val: boolean) {
    state.usingNewRelease = val;
  },
  [AppMutations.INCREMENT_OVERLAY_COUNT](state) {
    state.openOverlays += 1;
  },
  [AppMutations.SUBTRACT_OVERLAY_COUNT](state) {
    state.openOverlays -= 1;
  },
  [AppMutations.DISABLE_NAVIGATION](state) {
    state.navigationDisabled = true;
  },
  [AppMutations.ENABLE_NAVIGATION](state) {
    state.navigationDisabled = false;
  },
};
