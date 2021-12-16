import { MutationTree } from 'vuex';
import { Toast, ToastState } from './types';

export enum ToastMutations {
  CHANGE_TOAST = 'CHANGE_TOAST',
}

export const mutations: MutationTree<ToastState> = {
  [ToastMutations.CHANGE_TOAST](state, changes: Toast) {
    state.toast = {
      content: changes.content,
      duration: changes.duration || 5000,
      theme: changes.theme || 'default',
      dismissable: changes.dismissable !== undefined ? changes.dismissable : true,
    };
  },
};
