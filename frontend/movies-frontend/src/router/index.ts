import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';
import { nextTick } from 'vue';
import Home from '@/views/Home.vue';
import ShareTarget from '@/views/ShareTarget.vue';
import Library from '@/views/Library.vue';
import Account from './routes/account';
import Legal from './routes/legal';
import Onboarding from './routes/onboarding';
import Find from './routes/find';
import Wireframe from './routes/wireframe';
import handleMetaTags from './middleware/metaTags';
import handlePageTitle from './middleware/pageTitle';
import store from '@/store';
import { TRIGGER_SCROLL_EVENT_NAME } from '@/router/utils';
import { navigatedToNewPage } from '@/router/utils';
import { AppMutations } from '@/store/app/mutations';
import { getUrlParamValues } from '@/utils/getUrlParams';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/library',
    name: 'Library',
    component: Library,
    meta: {
      title: 'Library',
    },
  },
  ...Find,
  ...Account,
  ...Legal,
  ...Onboarding,
  ...Wireframe,
  {
    path: '/share-target',
    name: 'ShareTarget',
    component: ShareTarget,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "error" */ '@/views/ErrorPage.vue'),
  },
];

// seems like vue router sets this on it's own, so we don't have to do it
// We want it set to 'manual' as some navigations would otherwise make the page jump because a popstate event is fired
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
      document.addEventListener(TRIGGER_SCROLL_EVENT_NAME, function handler(e) {
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

router.afterEach((to, from) => {
  if (navigatedToNewPage(to, from)) {
    handlePageTitle(to);
    handleMetaTags(to);

    // Complete the animation of the route progress bar.
    store.commit(AppMutations.SET_ROUTE_LOADING, false);
  }
});

const checkOnboarding = (to: RouteLocationNormalized, next: NavigationGuardNext): void => {
  // always allow going to TOS and privacypolicy pages
  if (to.name === 'TOS' || to.name === 'PrivacyPolicy') {
    next();
    return;
  }

  // redirect everything else to onboarding
  if (!store.getters.onboardingComplete && to.name !== 'Onboarding') {
    next({ name: 'Onboarding', query: { step: 0 } });
  } else {
    next();
  }
};

const checkShareTarget = (to: RouteLocationNormalized, next: NavigationGuardNext): void => {
  // check if user shared content with the app. Works with share_target defined in web manifest (vue.config.js)
  // https://web.dev/learn/pwa/os-integration/#web-share-target
  // https://web.dev/web-share-target/

  // IMPORTANT NOTE: Be sure to verify incoming data. Unfortunately, there is no guarantee that other apps will share the appropriate content in the right parameter.
  // For example, on Android, the "url" field will be empty because it's not supported in Android's share system. Instead, URLs will often appear in the "text" field, or occasionally in the "title" field.
  if (to.name === 'ShareTarget') {
    const { shared_title, shared_text, shared_url } = getUrlParamValues([
      'shared_title',
      'shared_text',
      'shared_url',
    ]);

    console.log('Title shared: ' + shared_title);
    console.log('Text shared: ' + shared_text);
    console.log('URL shared: ' + shared_url);

    // if ('some condition') {
    //   // handle shared content here. e.g. redirect to another page and send down content as props to that view component
    // }

    // NOTE: for now the app doesn't have any use for share target, so we simply continue the navigation to the dev view component
    next();
  }
};

router.beforeEach((to, from, next) => {
  if (store.getters.navigationDisabled) {
    console.log('Preventing navigation. Navigation is disabled');
    next(false);
    return;
  }
  if (store.getters.openOverlaysCount > 0 && !store.getters.showReleaseNotes) {
    // we also check for showReleaseNotes, as that component is initialized before the router kicks in,
    // so the releasenote modal appears and would otherwise prevent the initial routing to a page
    console.log('Preventing navigation, overlay is open');
    next(false);
    return;
  }
  checkOnboarding(to, next);
  // TODO: return if checkOnboarding wants to redirect

  checkShareTarget(to, next);
  // TODO: return if checkShareTarget wants to redirect

  // If this isn't an initial page load and not an in-page navigation to e.g. a hash
  if (from.name !== null && from.name !== undefined && navigatedToNewPage(to, from)) {
    // Start the route progress bar.
    store.commit(AppMutations.SET_ROUTE_LOADING, true);
  }
});

export default router;
