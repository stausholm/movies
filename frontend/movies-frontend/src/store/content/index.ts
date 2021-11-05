import { Module } from 'vuex';
import { RootState } from '../types';
import { ContentState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

export const state: ContentState = {
  videos: [],
  loading: true,
  loadingFailed: false,
};

export const content: Module<ContentState, RootState> = {
  state,
  getters,
  mutations,
  actions,
  //namespaced: true,
};
