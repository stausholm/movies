/* eslint-disable no-console */

import { register } from 'register-service-worker';
import store from '@/store';
import { ToastMutations } from '@/store/toast/mutations';
import { Toast } from '@/store/toast/types';
import { APP_NAME } from '@/constants/SiteSettings.json';

const runningLocally =
  window.location.host.includes('localhost') || window.location.host.includes('127.0.0.1');

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      if (runningLocally) {
        console.log(
          'App is being served from cache by a service worker.\n' +
            'For more details, visit https://goo.gl/AFskqB'
        );
      }
    },
    registered() {
      if (runningLocally) console.log('Service worker has been registered.');
    },
    cached() {
      if (runningLocally) console.log('Content has been cached for offline use.');
      store.commit(ToastMutations.ADD_TOAST, {
        content: `${APP_NAME} has been fully cached on your device and will be available offline from now on`,
        theme: 'success',
        duration: 4000,
      } as Toast);
    },
    updatefound() {
      if (runningLocally) console.log('New content is downloading.');
    },
    updated(registration) {
      if (runningLocally) console.log('New content is available; please refresh.');

      store.commit(ToastMutations.ADD_TOAST, {
        action() {
          if (registration.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload(); // TODO: verify that it also clears cache https://stackoverflow.com/questions/55127650/location-reloadtrue-is-deprecated
        },
        actionLabel: 'Refresh',
        content: `A new version of ${APP_NAME} is available, refresh to start using the newest verison`,
        duration: 10000000,
      });
    },
    offline() {
      if (runningLocally)
        console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
      store.commit(ToastMutations.ADD_TOAST, {
        content: `There was an error while caching the application: ${error.message}`,
        theme: 'danger',
        duration: 10 * 1000,
      } as Toast);
    },
  });
}
