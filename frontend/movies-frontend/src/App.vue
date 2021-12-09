<template>
  <navbar />
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" mode="out-in" @after-leave="afterLeave">
      <component :is="Component" />
    </transition>
  </router-view>
  <div id="teleporttarget"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ContentActions } from '@/store/content/actions';
import { determineAppLayoutSizeWidth } from '@/utils/determineAppLayoutSize';
import { AppMutations } from '@/store/app/mutations';
import Navbar from '@/components/Navbar.vue';
import { disableBrowserFeatures } from '@/utils/PWAUtils';
import { replaceBrokenImagesInit, generateQuerySelector } from '@/utils/handleBrokenImages';

export default defineComponent({
  components: {
    Navbar,
  },
  data() {
    return {
      transitionName: 'route-primary',
    };
  },
  methods: {
    resizeWatcher(): void {
      const newSize = determineAppLayoutSizeWidth();
      if (this.$store.getters.layoutSize !== newSize) {
        this.$store.commit(AppMutations.SET_LAYOUT_WIDTH, newSize);
      }
    },
    afterLeave(): void {
      // TODO: implement scrollposition in router
      // console.log('afterLeave fired');
      // this.$root.$emit('triggerScroll');
    },
  },
  created() {
    this.$store.dispatch(ContentActions.LOAD_VIDEOS);

    window.addEventListener('resize', this.resizeWatcher);

    if (this.$store.getters.launchedAsPWA) {
      disableBrowserFeatures();
    }

    const imageCallback = (img: HTMLElement) => {
      const debugObj = {
        url: window.location.href,
        imgPath: img.dataset.brokenImageSrc,
        querySelector: generateQuerySelector(img),
      };
      console.log('BROKEN IMAGE:', debugObj);
    };

    replaceBrokenImagesInit('/img/TODO.png', imageCallback);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeWatcher);
  },
});
</script>
