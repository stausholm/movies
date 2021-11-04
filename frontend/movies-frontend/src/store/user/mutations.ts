import { MutationTree } from 'vuex';
import { UserState } from './types';

export enum UserMutations {
  SET_USERNAME = 'SET_USERNAME',
  SET_USERS = 'SET_USERS',
}

export const mutations: MutationTree<UserState> = {
  [UserMutations.SET_USERNAME](state, payload: string) {
    state.username = payload;
  },
  [UserMutations.SET_USERS](state, payload: string) {
    state.username = payload;
  },
};
