import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { user } from './user';
import { content } from './content';

const store: StoreOptions<RootState> = {
  state: {
    __: null,
  },
  modules: {
    user,
    content,
  },
  strict: process.env.NODE_ENV !== 'production',
};

export default new Vuex.Store<RootState>(store);
