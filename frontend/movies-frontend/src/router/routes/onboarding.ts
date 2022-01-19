import { RouteRecordRaw } from 'vue-router';
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import(/* webpackChunkName: "onboarding" */ '@/views/onboarding/Index.vue'),
    meta: {
      hideNavigation: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters.onboardingComplete) {
        next({ name: 'Home' });
      } else {
        next();
      }
    },
  },
];

export default routes;
