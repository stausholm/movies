import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/licenses',
    name: 'Licenses',
    component: () => import(/* webpackChunkName: "legal" */ '@/views/legal/Licenses.vue'),
    meta: {
      title: 'Licenses',
    },
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import(/* webpackChunkName: "legal" */ '@/views/legal/PrivacyPolicy.vue'),
    meta: {
      title: 'Privacy Policy',
    },
  },
  {
    path: '/tos',
    name: 'TOS',
    component: () => import(/* webpackChunkName: "legal" */ '@/views/legal/Tos.vue'),
    meta: {
      title: 'Terms of Service',
    },
  },
];

export default routes;
