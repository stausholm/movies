// import { createStore } from 'vuex';
// import { user, State as UserState } from './modules/user';

// export type RootState = {
//   user: UserState;
// };

// export const store = createStore<RootState>({
//   modules: {
//     user,
//   },
//   //strict: process.env.NODE_ENV !== 'production',
// });

//import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { user } from './user';

//Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    helloMessage: 'aaaa',
  },
  modules: {
    user,
  },
  //strict: process.env.NODE_ENV !== 'production',
};

export default new Vuex.Store<RootState>(store);
