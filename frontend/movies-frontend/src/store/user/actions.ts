import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { UserState } from './types';

export const actions: ActionTree<UserState, RootState> = {
  loadAPIResult({ commit }): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        commit('SET_USERS', data);
      });
  },
};
