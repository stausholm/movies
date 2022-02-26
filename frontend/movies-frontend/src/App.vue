<template>
  <loader-global />
  <skip-links v-show="!hideNavigation" />
  <navbar v-show="!hideNavigation" />
  <primary-router-view />

  <!-- teleport targets -->
  <div id="teleporttarget"></div>
  <div id="modal"></div>
  <div id="overlay"></div>

  <pwa-install-overlay v-if="showPwaOverlay" />

  <changelog-modal />

  <toast-container />

  <pwa-install-listeners />
  <announcer />
  <offline-notice @offline="handleOffline" @online="handleOnline" />
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
import LoaderGlobal from '@/components/LoaderGlobal.vue';
import OfflineNotice from '@/components/OfflineNotice.vue';
import { ToastMutations } from '@/store/toast/mutations';
import { Toast } from '@/store/toast/types';
import { warnAboutMeteredConnection } from '@/utils/networkConnection';
import ChangelogModal from '@/components/ChangelogModal.vue';

export default defineComponent({
  components: {
    Navbar,
    PrimaryRouterView,
    ToastContainer,
    PwaInstallOverlay,
    PwaInstallListeners,
    SkipLinks,
    Announcer,
    OfflineNotice,
    ChangelogModal,
    LoaderGlobal,
  },
  computed: {
    showPwaOverlay(): boolean {
      return this.$store.getters.showPWAOverlay;
    },
    hideNavigation(): boolean {
      // TODO: if the router hasn't kicked in yet, this will flash for a short period. E.g. if the first loaded page is /onboarding
      return !!this.$route.meta.hideNavigation;
    },
  },
  methods: {
    resizeWatcher(): void {
      const newSize = determineAppLayoutSizeWidth();
      if (this.$store.getters.layoutSize !== newSize) {
        this.$store.commit(AppMutations.SET_LAYOUT_WIDTH, newSize);
      }
    },
    handleOffline(): void {
      this.$store.commit(ToastMutations.REMOVE_TOAST_BY_ID, 'appIsOnline');
      this.$store.commit(ToastMutations.ADD_TOAST, {
        id: 'appIsOffline',
        content: "You're offline.",
        theme: 'warning',
        dismissable: false,
        duration: 1000 * 60 * 15, // 15 minutes
      } as Toast);
    },
    handleOnline(): void {
      this.$store.commit(ToastMutations.REMOVE_TOAST_BY_ID, 'appIsOffline');
      this.$store.commit(ToastMutations.ADD_TOAST, {
        id: 'appIsOnline',
        content: "You're back online!",
        theme: 'success',
      } as Toast);
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

    if (warnAboutMeteredConnection()) {
      this.$store.commit(ToastMutations.ADD_TOAST, {
        id: 'connectionMayBeMetered',
        content:
          'It seems like you might be on a slow / metered connection. Loading many posters can use a lot of data, so you may want to connect to WiFi before you do so',
        theme: 'warning',
        dismissable: true,
        duration: 1000 * 20,
      } as Toast);
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeWatcher);
  },
});
</script>
