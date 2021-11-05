import { Module } from 'vuex';
import { RootState } from '../types';
import { ToastState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';

export const state: ToastState = {
  toast: {
    content: '',
    duration: 1000, // ms
    theme: 'default', // color settings,
    action: null,
    label: 'Dismiss', // TODO: translations
    dismissable: true,
  },
};

export const toast: Module<ToastState, RootState> = {
  state,
  getters,
  mutations,
  //namespaced: true,
};
