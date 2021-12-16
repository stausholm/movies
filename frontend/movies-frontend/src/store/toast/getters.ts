import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { Toast, ToastState } from './types';

export const getters: GetterTree<ToastState, RootState> = {
  toasts(state): Toast[] {
    return state.toasts;
  },
};
