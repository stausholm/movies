<template>
  <div class="pwa-install-content-banner" v-if="showPWAInstallButton && showBanner !== false">
    <div class="text">
      <slot>
        <img src="../assets/logo.png" alt="" />
        <div>
          <strong class="text-big">Install {{ appName }}</strong>
          <p>Our app is fast, small, and works offline.</p>
        </div>
      </slot>
    </div>
    <div class="buttons">
      <button class="btn btn--text mr" @click.stop="showBanner = false">Not now</button>
      <pwa-install-button class="btn">Install</pwa-install-button>
    </div>
  </div>
</template>

<script lang="ts">
// https://developers.google.com/web/fundamentals/app-install-banners/promoting-install-mobile
import { defineComponent } from 'vue';
import PwaInstallButton from '@/components/PwaInstallButton.vue';
import { APP_NAME } from '@/constants/SiteSettings.json';

export default defineComponent({
  components: {
    PwaInstallButton,
  },
  data() {
    return {
      showBanner: true,
      appName: APP_NAME,
    };
  },
  computed: {
    showPWAInstallButton(): boolean {
      return this.$store.getters.showPWAInstallButton;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.pwa-install-content-banner {
  padding: $default-spacing;
  background-color: $brand-primary;
  color: $__brand-primary-bg__text-color;
  border-radius: $border-radius-base;

  .text {
    display: flex;

    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: $default-spacing;
      border: $border-width-large solid $white;
    }
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
