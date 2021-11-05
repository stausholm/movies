import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { Toast, ToastState } from './types';

export const getters: GetterTree<ToastState, RootState> = {
  toastSettings(state): Toast {
    return state.toast;
  },
};
