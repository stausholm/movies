import { Module } from 'vuex';
import { RootState } from '../types';
import { ToastState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';

export const state: ToastState = {
  toast: {
    content: '',
    duration: 5000, // ms
    theme: 'default', // color settings,
    action: null,
    actionLabel: '',
    dismissable: true,
  },
};

export const toast: Module<ToastState, RootState> = {
  state,
  getters,
  mutations,
  //namespaced: true,
};
