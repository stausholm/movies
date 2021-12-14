import { App } from 'vue';

declare module 'vue-router' {
  interface Router {
    /**
     * Root component of the Vue app that uses the router
     */
    app: App<Element>;
  }
}
