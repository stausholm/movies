import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    name: 'AccountIndex',
    component: () => import(/* webpackChunkName: "account" */ '@/views/account/Index.vue'),
    meta: {
      title: 'My stuff',
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Account.vue'),
        meta: {},
      },
      {
        path: 'starred',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Starred.vue'),
        meta: {},
      },
      {
        path: 'about',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/About.vue'),
        meta: {},
      },
      {
        path: 'about/credits',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Credits.vue'),
        meta: {},
      },
      {
        path: 'delete',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Delete.vue'),
        meta: {},
      },
      {
        path: 'feedback',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Feedback.vue'),
        meta: {},
      },
      {
        path: 'changelog',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Changelog.vue'),
        meta: {},
      },
      {
        path: 'button',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Button.vue'),
        meta: {},
      },
    ],
  },
];

export default routes;
