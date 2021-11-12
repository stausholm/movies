import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { user } from './user';
import { content } from './content';
import { PWA } from './PWA';
import { toast } from './toast';
import { app } from './app';

const store: StoreOptions<RootState> = {
  state: {
    __: null,
  },
  modules: {
    user,
    content,
    PWA,
    toast,
    app,
  },
  strict: process.env.NODE_ENV !== 'production',
};

export default new Vuex.Store<RootState>(store);
