<template>
  <section class="skip-links" aria-label="Skip links" tabindex="-1">
    <ul>
      <li>
        <a href="#main" class="visually-hidden-focusable skip-link">Skip to main content</a>
      </li>
      <li v-if="$route.name !== 'Find'">
        <router-link :to="{ name: 'Find' }" class="visually-hidden-focusable skip-link">
          Go to Search
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { navigatedToNewPage } from '@/router/utils';
import { defineComponent } from 'vue';
import { RouteLocationNormalized } from 'vue-router';
import { TRIGGER_SCROLL_EVENT_NAME } from '@/router/utils';

export default defineComponent({
  name: 'SkipLinks',
  watch: {
    $route(to: RouteLocationNormalized, from: RouteLocationNormalized) {
      if (navigatedToNewPage(to, from)) {
        const $el = this.$el;
        // wait for route transition to finish
        document.addEventListener(TRIGGER_SCROLL_EVENT_NAME, function handler(e) {
          e.currentTarget?.removeEventListener(e.type, handler);

          $el.focus();
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.skip-links {
  width: 0;
  height: 0;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0;
      padding: 0;
    }
  }
}
.skip-link {
  &:focus {
    position: absolute;
    top: $default-spacing;
    left: $default-spacing;
    padding: $default-spacing;
    background-color: $brand-primary;
    color: $brand-primary-bg__text-color;
    font-weight: bold;
    text-decoration: none;
    @include z-index(skiplink);
  }
}
</style>
