import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/licenses',
    name: 'Licenses',
    component: () => import(/* webpackChunkName: "legal" */ '@/views/legal/Licenses.vue'),
    meta: {},
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import(/* webpackChunkName: "legal" */ '@/views/legal/PrivacyPolicy.vue'),
    meta: {},
  },
  {
    path: '/tos',
    name: 'TOS',
    component: () => import(/* webpackChunkName: "legal" */ '@/views/legal/Tos.vue'),
    meta: {},
  },
];

export default routes;
