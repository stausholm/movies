import { NavigationGuardNext, RouteLocationNormalized, RouteLocationRaw } from 'vue-router';

export const TRIGGER_SCROLL_EVENT_NAME = 'triggerscroll';
export const TRIGGER_SCROLL_EVENT = new CustomEvent(TRIGGER_SCROLL_EVENT_NAME);
export const triggerScrollEvent = (): void => {
  document.dispatchEvent(TRIGGER_SCROLL_EVENT);
};

// This only includes changes to actual new pages, and not changes to hash or queryparams
export const navigatedToNewPage = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
): boolean => {
  return to.path !== from.path;
};

export type ErrorPageType = 'networkIssue' | 'notFound';
export type ErrorPageResource = undefined | 'page' | 'movie' | 'series';
// if a specific route's beforeEnter method fails, it can call this function to redirect
export const goToErrorPage = (
  routeTo: RouteLocationNormalized,
  next: NavigationGuardNext,
  type: ErrorPageType,
  resource?: ErrorPageResource
): void => {
  next(getErrorPageRouteObj(routeTo, type, resource));
};

// this object can be used within vue router and also inside components with e.g. this.$router.push(getErrorPageRouteObj(this.$route))
export const getErrorPageRouteObj = (
  routeTo: RouteLocationNormalized,
  type: ErrorPageType,
  resource: ErrorPageResource = 'page'
): RouteLocationRaw => {
  return {
    name: 'ErrorPage',
    params: {
      resource: resource,
      type: type,
      // preserve current path and remove the first char to avoid the target URL starting with `//`
      pathMatch: routeTo.path.substring(1).split('/'),
    },
    // preserve existing query and hash if any
    query: routeTo.query,
    hash: routeTo.hash,
  };
};
