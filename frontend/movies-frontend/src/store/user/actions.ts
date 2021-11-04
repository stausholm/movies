import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { UserMutations } from './mutations';
import { UserState } from './types';

export enum UserActions {
  LOAD_USERS = 'LOAD_USERS',
}

export const actions: ActionTree<UserState, RootState> = {
  [UserActions.LOAD_USERS]({ commit }): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        commit(UserMutations.SET_USERS, data);
      });
  },
};
