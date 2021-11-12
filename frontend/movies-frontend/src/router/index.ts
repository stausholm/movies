import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Library from '@/views/Library.vue';
import Account from './routes/account';
import Legal from './routes/legal';
import Onboarding from './routes/onboarding';
import Find from './routes/find';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/wireframe',
    name: 'Wireframe',
    component: () => import(/* webpackChunkName: "wireframe" */ '@/views/Wireframe.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/library',
    name: 'Library',
    component: Library,
  },
  ...Find,
  ...Account,
  ...Legal,
  ...Onboarding,
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "error" */ '@/views/ErrorPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
