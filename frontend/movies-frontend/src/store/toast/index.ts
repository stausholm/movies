import { Module } from 'vuex';
import { RootState } from '../types';
import { ToastState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';

export const state: ToastState = {
  toasts: [],
};

export const toast: Module<ToastState, RootState> = {
  state,
  getters,
  mutations,
  //namespaced: true,
};
