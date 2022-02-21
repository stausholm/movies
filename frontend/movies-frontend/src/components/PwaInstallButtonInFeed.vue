<template>
  <div class="pwa-install-content-banner" v-if="showPWAInstallButton && showBanner !== false">
    <div class="text">
      <slot>
        <div class="pwa-install-content-banner__logo">
          <img src="@/assets/logo-color.svg" alt="" />
        </div>
        <div>
          <strong class="text-big">Install {{ appName }}</strong>
          <p>Our app is fast, small, and works offline.</p>
        </div>
      </slot>
    </div>
    <div class="buttons">
      <button class="btn btn--text mr" @click.stop="decline">Not now</button>
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
  emits: ['decline'],
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
  methods: {
    decline() {
      this.showBanner = false;
      this.$emit('decline');
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
      object-fit: contain;
    }
  }

  &__logo {
    height: 80px;
    width: 80px;
    min-width: 80px;
    min-height: 80px;
    border-radius: 50%;

    margin-right: $default-spacing;
    border: $border-width-large solid $white;
    padding: $default-spacing * 0.5;
    background-color: $white;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
  .btn--text {
    color: inherit;
  }
}
</style>
