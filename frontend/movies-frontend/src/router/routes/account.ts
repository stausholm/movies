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
        name: 'Account',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Account.vue'),
        meta: {},
      },
      {
        path: 'starred',
        name: 'Starred',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Starred.vue'),
        meta: {
          title: 'Starred',
        },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/About.vue'),
        meta: {},
      },
      {
        path: 'about/credits',
        name: 'Credits',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Credits.vue'),
        meta: {},
      },
      {
        path: 'about/permissions',
        name: 'Permissions',
        component: () =>
          import(/* webpackChunkName: "account" */ '@/views/account/Permissions.vue'),
        meta: {},
      },
      {
        path: 'delete',
        name: 'Delete',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Delete.vue'),
        meta: {},
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Feedback.vue'),
        meta: {},
      },
      {
        path: 'changelog',
        name: 'Changelog',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Changelog.vue'),
        meta: {},
      },
      {
        path: 'button',
        name: 'ButtonPage',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Button.vue'),
        meta: {},
      },
      {
        path: 'tips',
        name: 'Tips',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/Tips.vue'),
        meta: {},
      },
    ],
  },
];

export default routes;
