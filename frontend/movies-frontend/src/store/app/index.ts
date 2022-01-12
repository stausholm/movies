import { Module } from 'vuex';
import { RootState } from '../types';
import { AppState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';
import { determineAppLayoutSizeWidth } from '@/utils/determineAppLayoutSize';

export const state: AppState = {
  layoutSizeWidth: determineAppLayoutSizeWidth(),
  announceMessage: '',
};

export const app: Module<AppState, RootState> = {
  state,
  getters,
  mutations,
  //namespaced: true,
};
