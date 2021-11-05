import Episode from '@/types/Episode';
import Movie from '@/types/Movie';
import Series from '@/types/Series';
import { MutationTree } from 'vuex';
import { ContentState } from './types';

export enum ContentMutations {
  SET_LOADING_FAILED = 'SET_LOADING_FAILED',
  SET_LOADING = 'SET_LOADING',
  SET_VIDEOS = 'SET_VIDEOS',
}

export const mutations: MutationTree<ContentState> = {
  [ContentMutations.SET_LOADING](state, payload: boolean) {
    state.loading = payload;
  },
  [ContentMutations.SET_LOADING_FAILED](state, payload: boolean) {
    state.loadingFailed = payload;
  },
  [ContentMutations.SET_VIDEOS](state, payload: (Episode | Series | Movie)[]) {
    state.videos = payload;
  },
};
