import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { ContentMutations } from './mutations';
import { ContentState } from './types';

export enum ContentActions {
  LOAD_VIDEOS = 'LOAD_VIDEOS',
}

export const actions: ActionTree<ContentState, RootState> = {
  [ContentActions.LOAD_VIDEOS]({ commit }): Promise<void> {
    commit(ContentMutations.SET_LOADING, true);
    commit(ContentMutations.SET_LOADING_FAILED, false);
    return fetch('/db.json')
      .then((res) => res.json())
      .then((data) => {
        commit(ContentMutations.SET_VIDEOS, data);
      })
      .catch((err) => {
        console.log(err);
        commit(ContentMutations.SET_LOADING_FAILED, true);
      })
      .finally(() => {
        commit(ContentMutations.SET_LOADING, false);
      });
  },
};
