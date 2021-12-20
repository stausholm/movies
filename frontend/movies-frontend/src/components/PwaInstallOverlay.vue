<template>
  <div class="pwa-install-overlay">
    <!-- TODO: focus trap and esc key -->
    <div class="container container--xxs">
      <div class="icons">
        <div class="icon"></div>
        <div class="icon"></div>
        <div
          class="icon"
          style="background-image: url('/img/icons/android-chrome-512x512.png')"
        ></div>
        <div class="icon"></div>
        <div class="icon"></div>
      </div>

      <strong class="h2 text-center d-block mb-1 title">Install {{ appName }}</strong>
      <p class="mb-1">
        Pin {{ appName }} on your homescreen for quick and easy access when you're on the go
      </p>
      <p class="instructions mb-1">
        Just tap
        <base-icon width="18" height="18">
          <component :is="installIcon" />
        </base-icon>
        then '{{ installLabel }}'
      </p>
      <!-- <p>
          Tap your browser's settings icon, and select 'Add to homescreen' to pin the {{appName}} web app and enjoy offline support
        </p> -->
      <button class="btn btn--responsive" @click.stop="toggleOverlay">Got it!</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconMoreVert from '@/components/icons/IconMoreVert.vue';
import IconIosShare from '@/components/icons/IconIosShare.vue';
import { APP_NAME } from '@/constants/SiteSettings.json';
import { PWAMutations } from '@/store/PWA/mutations';

type OS = 'windows' | 'macos' | 'linux';

export default defineComponent({
  name: 'PwaInstallOverlay',
  components: {
    BaseIcon,
    'icon-android': IconMoreVert,
    'icon-windows': IconMoreVert,
    'icon-ios': IconIosShare,
  },
  data() {
    return {
      appName: APP_NAME,
    };
  },
  computed: {
    installLabel(): string {
      const OS = 'windows' as OS; // TODO
      switch (OS) {
        case 'windows':
          return `Install ${this.appName}...`;
        case 'macos':
          return 'Add to Home Screen';
        case 'linux':
          return 'Add to Home screen';
        default:
          break;
      }
      return 'Add to Home Screen';
    },
    installIcon(): string {
      const OS = 'windows' as OS; // TODO
      switch (OS) {
        case 'windows':
          return 'icon-windows';
        case 'macos':
          return 'icon-ios';
        case 'linux':
          return 'icon-android';
        default:
          break;
      }
      return 'icon-android';
    },
  },
  methods: {
    toggleOverlay() {
      this.$store.commit(PWAMutations.TOGGLE_OVERLAY);
    },
  },
  mounted() {
    document.body.classList.add('overflow-hide');
  },
  beforeUnmount() {
    document.body.classList.remove('overflow-hide');
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.pwa-install-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include z-index(a2hs);
  background-color: rgba($__brand-primary, 0.95);
  color: $brand-primary-bg__text-color;
  cursor: default;

  .icons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: $default-spacing * 4;
    margin-bottom: $default-spacing * 2;
    margin-left: math.div(-$default-spacing, 2);
    margin-right: math.div(-$default-spacing, 2);

    .icon {
      width: 20%;
      margin: math.div($default-spacing, 2);

      &::after {
        content: '';
        display: block;
        padding-top: 100%;
        background-color: $gray-200;
        border-radius: 16px;
        opacity: 0.15;
      }

      &:nth-child(1),
      &:nth-child(5) {
        &::after {
          background-color: $gray-500;
        }
      }

      &:nth-child(3) {
        background-size: 70%;
        background-position: center center;
        background-repeat: no-repeat;

        &::after {
          background-color: $brand-secondary;
          opacity: 1;
          box-shadow: $box-shadow;
          z-index: -1;
          position: relative;
        }
      }
    }

    @include breakpoint-max(sm) {
      margin-bottom: $default-spacing;

      .icon {
        margin: math.div($default-spacing, 4);
      }
    }
  }

  .title {
    color: inherit;
  }

  .instructions {
    background-color: rgba($gray-200, 0.2);
    padding: math.div($default-spacing, 2);
    border-radius: $border-radius-base;
    display: flex;
    align-items: center;

    svg {
      margin: 0 math.div($default-spacing, 2);
    }
  }

  .btn {
    float: right;
  }
}
</style>
