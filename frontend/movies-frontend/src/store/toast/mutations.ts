import { MutationTree } from 'vuex';
import { Toast, ToastState } from './types';

export enum ToastMutations {
  CHANGE_TOAST = 'CHANGE_TOAST',
  ADD_TOAST = 'ADD_TOAST',
  REMOVE_TOAST = 'REMOVE_TOAST',
  REMOVE_TOAST_BY_ID = 'REMOVE_TOAST_BY_ID',
  CLEAR_TOASTS = 'CLEAR_TOASTS',
}

export const mutations: MutationTree<ToastState> = {
  [ToastMutations.CHANGE_TOAST](state, changes: Toast) {
    // overwrite the existing first toast, instead of pushing a new toast  to the screen. Useful in case of limited screenspace
    state.toasts[0] = {
      id: changes.id || undefined,
      content: changes.content,
      duration: changes.duration || 5000,
      theme: changes.theme || 'default',
      dismissable: changes.dismissable !== undefined ? changes.dismissable : true,
      action: changes.action || null,
      actionLabel: changes.actionLabel || '',
    };
  },
  [ToastMutations.ADD_TOAST](state, toast: Toast) {
    state.toasts.push({
      id: toast.id || undefined,
      content: toast.content,
      duration: toast.duration || 5000,
      theme: toast.theme || 'default',
      dismissable: toast.dismissable !== undefined ? toast.dismissable : true,
      action: toast.action || null,
      actionLabel: toast.actionLabel || '',
    });
  },
  [ToastMutations.REMOVE_TOAST](state, toast: Toast) {
    // TODO: this could be better in case 2 toasts are identical. Could add a guid for each toast,
    // but then it becomes harder to programatically remove the toast unless we store that guid where we call the "add" mutation?
    state.toasts = state.toasts.filter((x) => x !== toast);
  },
  [ToastMutations.REMOVE_TOAST_BY_ID](state, id: string) {
    state.toasts = state.toasts.filter((x) => x.id !== id);
  },
  [ToastMutations.CLEAR_TOASTS](state) {
    state.toasts = [];
  },
};
