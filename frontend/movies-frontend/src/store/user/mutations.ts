import { setLocalStorageValue } from '@/utils/localStorage';
import { MutationTree } from 'vuex';
import { APP_SETTINGS_STORAGE_KEY } from './constants';
import { AppSettingPayload, UserState } from './types';

export enum UserMutations {
  SET_APPSETTING = 'SET_APPSETTING',
  ADD_STARRED = 'ADD_STARRED',
  REMOVE_STARRED = 'REMOVE_STARRED',
}

export const mutations: MutationTree<UserState> = {
  [UserMutations.SET_APPSETTING](state, payload: AppSettingPayload) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state.appSettings as any)[payload.key] = payload.val;

    setLocalStorageValue(APP_SETTINGS_STORAGE_KEY, state.appSettings);
  },
  [UserMutations.ADD_STARRED](state, imdbId: string) {
    state.starredIds.push(imdbId);
  },
  [UserMutations.REMOVE_STARRED](state, imdbId: string) {
    state.starredIds.splice(state.starredIds.indexOf(imdbId), 1);
  },
};
