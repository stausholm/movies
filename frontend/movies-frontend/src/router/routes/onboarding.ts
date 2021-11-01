import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/onboarding',
    name: 'OnboardingIndex',
    component: () => import(/* webpackChunkName: "onboarding" */ '@/views/onboarding/Index.vue'),
    meta: {},
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "onboarding" */ '@/views/onboarding/Step1.vue'),
        meta: {},
      },
      {
        path: 'step2',
        component: () =>
          import(/* webpackChunkName: "onboarding" */ '@/views/onboarding/Step2.vue'),
        meta: {},
      },
      {
        path: 'step3',
        component: () =>
          import(/* webpackChunkName: "onboarding" */ '@/views/onboarding/Step3.vue'),
        meta: {},
      },
      {
        path: 'step4',
        component: () =>
          import(/* webpackChunkName: "onboarding" */ '@/views/onboarding/Step4.vue'),
        meta: {},
      },
    ],
  },
];

export default routes;
