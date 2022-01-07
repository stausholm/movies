import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Library from '@/views/Library.vue';
import Account from './routes/account';
import Legal from './routes/legal';
import Onboarding from './routes/onboarding';
import Find from './routes/find';

import { nextTick } from 'vue';

export const TRIGGER_SCROLL_EVENT = new CustomEvent('triggerscroll');
export const triggerScrollEvent = (): void => {
  document.dispatchEvent(TRIGGER_SCROLL_EVENT);
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/wireframe',
    name: 'WireframeIndex',
    component: () => import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/Index.vue'),
    children: [
      {
        path: '',
        name: 'Wireframe',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/Wireframe.vue'),
        meta: {},
      },
      {
        path: 'notes',
        name: 'ExampleNotes',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleNotes.vue'),
        meta: {},
      },
      {
        path: 'inputs',
        name: 'ExampleInputs',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleInputs.vue'),
        meta: {},
      },
      {
        path: 'blocklinks',
        name: 'ExampleBlockLinks',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleBlockLinks.vue'),
        meta: {},
      },
      {
        path: 'sparkles',
        name: 'ExampleSparkles',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleSparkles.vue'),
        meta: {},
      },
      {
        path: 'text',
        name: 'ExampleText',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleText.vue'),
        meta: {},
      },
      {
        path: 'toast',
        name: 'ExampleToast',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleToast.vue'),
        meta: {},
      },
      {
        path: 'buttons',
        name: 'ExampleButtons',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleButtons.vue'),
        meta: {},
      },
      {
        path: 'modal',
        name: 'ExampleModal',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleModal.vue'),
        meta: {},
      },
      {
        path: 'icons',
        name: 'ExampleIcons',
        component: () =>
          import(/* webpackChunkName: "wireframe" */ '@/views/wireframe/ExampleIcons.vue'),
        meta: {},
      },
    ],
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

// seems like vue router sets this on it's own, so we don't have to do it
// if ('scrollRestoration' in history) {
//   history.scrollRestoration = 'manual';
// }

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      // triggerscroll event is emitted from primary- and childRouterView once navigation transition is done
      // wait for the out transition to complete (if necessary)
      // TODO: handler function is on rare occasions triggered twice. Not perfect, but also doesn't break anything
      document.addEventListener('triggerscroll', function handler(e) {
        e.currentTarget?.removeEventListener(e.type, handler);

        // if the resolved position is falsy or an empty object,
        // will retain current scroll position.
        if (savedPosition) {
          return nextTick(() => resolve(savedPosition));
        } else if (to.hash) {
          return nextTick(() => resolve({ el: to.hash }));
        } else {
          return nextTick(() => resolve({ left: 0, top: 0 }));
        }
      });
    });
  },
});

export default router;
