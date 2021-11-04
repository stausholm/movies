import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { UserState } from './types';

export const getters: GetterTree<UserState, RootState> = {
  getUserInfo(state): string {
    return `Username: ${state.username} - Email: ${state.email}`;
  },
  getUsername(state): string {
    return state.username;
  },
};
