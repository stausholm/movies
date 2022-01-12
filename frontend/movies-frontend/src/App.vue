<template>
  <skip-links />
  <navbar />
  <primary-router-view />

  <!-- teleport targets -->
  <div id="teleporttarget"></div>
  <div id="modal"></div>

  <transition name="fade">
    <pwa-install-overlay v-if="showPwaOverlay" />
  </transition>

  <toast-container />

  <pwa-install-listeners />
  <announcer />
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
import ToastContainer from '@/components/ToastContainer.vue';
import PwaInstallOverlay from '@/components/PwaInstallOverlay.vue';
import PwaInstallListeners from '@/components/PwaInstallListeners.vue';
import { setCssVariable } from '@/utils/setCssVariable';
import SkipLinks from '@/components/SkipLinks.vue';
import Announcer from '@/components/Announcer.vue';

export default defineComponent({
  components: {
    Navbar,
    PrimaryRouterView,
    ToastContainer,
    PwaInstallOverlay,
    PwaInstallListeners,
    SkipLinks,
    Announcer,
  },
  computed: {
    showPwaOverlay(): boolean {
      return this.$store.getters.showPWAOverlay;
    },
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

    replaceBrokenImagesInit('/img/fallback-image.png', imageCallback);

    // init image saturation percentage setting
    setCssVariable(
      '--ui-saturation-percentage',
      this.$store.getters.getAppSettings.imageSaturation + '%'
    );
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeWatcher);
  },
});
</script>
