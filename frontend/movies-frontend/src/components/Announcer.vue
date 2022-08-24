<template>
  <div
    id="announcer"
    class="visually-hidden"
    aria-live="polite"
    aria-atomic="true"
    v-text="message"
  ></div>
</template>

<script lang="ts">
import { navigatedToNewPage } from '@/router/utils';
import { AppMutations } from '@/store/app/mutations';
import { defineComponent } from 'vue';
import { RouteLocationNormalized } from 'vue-router';

// inspiration https://github.com/vue-a11y/vue-announcer

export default defineComponent({
  name: 'Announcer',
  computed: {
    message(): string {
      return this.$store.getters.announceMessage;
    },
  },
  watch: {
    $route(to: RouteLocationNormalized, from: RouteLocationNormalized): void {
      if (navigatedToNewPage(to, from)) {
        const announcer = to.meta.announcer;
        const suffix = ' has loaded';
        let title = 'New page';

        if (announcer && announcer.skip) {
          // don't announce a navigation change for this route.
          // useful in case the title comes from something async,
          // after which the component getting the async title can call this.$store.commit(AppMutations.SET_ANNOUNCE_MESSAGE, 'title has loaded')
          return;
        }

        if (announcer && announcer.message) {
          title = announcer.message;
        } else if (to.meta.title) {
          title = to.meta.title;
        }

        // clear the value before setting it, in case navigating from a route with the same title as the new route, to make it more likely that it will be announced
        // eslint-disable-next-line no-undef
        const delayedRAF = (cb: FrameRequestCallback) =>
          requestAnimationFrame(() => requestAnimationFrame(cb));
        this.$store.commit(AppMutations.SET_ANNOUNCE_MESSAGE, '');
        delayedRAF(() => {
          this.$store.commit(AppMutations.SET_ANNOUNCE_MESSAGE, title + suffix);
        });
      }
    },
  },
});
</script>
