<template>
  <navbar />
  <primary-router-view />
  <div id="teleporttarget"></div>
  <toast />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ContentActions } from '@/store/content/actions';
import { determineAppLayoutSizeWidth } from '@/utils/determineAppLayoutSize';
import { AppMutations } from '@/store/app/mutations';
import Navbar from '@/components/Navbar.vue';
import { disableBrowserFeatures } from '@/utils/PWAUtils';
import { replaceBrokenImagesInit, generateQuerySelector } from '@/utils/handleBrokenImages';
import PrimaryRouterView from '@/router/PrimaryRouterView.vue';
import Toast from '@/components/Toast.vue';

export default defineComponent({
  components: {
    Navbar,
    PrimaryRouterView,
    Toast,
  },
  methods: {
    resizeWatcher(): void {
      const newSize = determineAppLayoutSizeWidth();
      if (this.$store.getters.layoutSize !== newSize) {
        this.$store.commit(AppMutations.SET_LAYOUT_WIDTH, newSize);
      }
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
