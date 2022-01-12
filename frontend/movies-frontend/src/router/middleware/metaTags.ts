import { RouteLocationNormalized } from 'vue-router';

export default function handleMetaTags(to: RouteLocationNormalized): void {
  // https://alligator.io/vuejs/vue-router-modify-head/
  // meta tags
  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).forEach((el) => {
    el.parentNode?.removeChild(el);
  });

  // there are meta tags
  if (nearestWithMeta && nearestWithMeta.meta.metaTags) {
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags
      .map((tagDef) => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach((key) => {
          tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create, so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
      })
      .forEach((tag) => document.head.appendChild(tag));
  }
}
