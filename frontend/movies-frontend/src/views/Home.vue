<template>
  <layout>
    <div class="container">
      <div class="home-top mb-2 mt-1">
        <div class="home-top__content d-flex align-start justify-between">
          <!-- TODO: motd should only animate the very first time the user lands on the homepage after opening the app, not on consecutive navigations to the homepage during the same session -->
          <motd class="h2 fw-normal" :animate="false" />
          <pwa-install-button
            class="btn btn--text btn--rounded ml-1 pwa-button"
            :hideText="true"
            v-if="showPWAInstallButton"
          />
        </div>
        <div class="home-top__logo">
          <img src="../assets/logo-big.svg" alt="" />
        </div>
      </div>
      <base-card
        class="mb-2"
        :title="`Customize what you see in ${appName}`"
        headingLevel="h2"
        tags="Did you know?"
        type="tip"
      >
        <p>Add or remove favourites, adjust app colors, animations, images & more</p>
        <template #footer>
          <router-link class="btn btn--text-primary" :to="{ name: 'Account' }">
            Go to Settings
          </router-link>
          <button class="btn btn--text">Got it</button>
        </template>
      </base-card>
      <base-card
        class="mb-2"
        title="Quick Access"
        headingLevel="h2"
        tags="Did you know?"
        type="tip"
      >
        <p>Use Quick Access to get around {{ appName }} quickly. Just press:</p>
        <!-- Button will open quick access menu -->
        <button class="btn btn--primary btn--uppercase">CTRL + K</button>
      </base-card>

      <h1><router-link to="/wireframe">Wireframe</router-link></h1>

      <pwa-install-button-in-feed />

      <p class="mt">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat voluptatem perspiciatis
        consequatur ex non accusamus illo voluptatibus? Laborum natus distinctio, earum corrupti
        blanditiis sapiente. Autem impedit officia voluptatum. In, magni?
      </p>

      <div v-if="hasStarredContent">
        <div>
          <h2>Recommended for you</h2>
        </div>
        <div>
          <h2><router-link :to="{ name: 'Starred' }">Starred</router-link></h2>
        </div>
      </div>
      <div>
        <h2>What are you in the mood for?</h2>
        <p>lorem ipsum</p>
      </div>
    </div>
    <zone theme="dark" v-if="!hasStarredContent">
      <div class="container container--xxs text-center mt-2 mb-2">
        <img src="../assets/star-graphic.svg" alt="" />
        <h2 class="mt-2">Star something</h2>
        <p>To get recommendations right here on your homescreen</p>
      </div>
    </zone>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import PwaInstallButtonInFeed from '@/components/PwaInstallButtonInFeed.vue';
import PwaInstallButton from '@/components/PwaInstallButton.vue';
import Motd from '@/components/Motd.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import { APP_NAME } from '@/constants/SiteSettings.json';
import { AppLayoutSizeWidth } from '@/store/app/types';
import Zone from '@/components/Zone.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Layout,
    PwaInstallButtonInFeed,
    PwaInstallButton,
    Motd,
    BaseCard,
    Zone,
  },
  data() {
    return {
      appName: APP_NAME,
    };
  },
  computed: {
    hasStarredContent(): boolean {
      const starredIds = this.$store.getters.getStarredIds as string[];
      return starredIds.length > 0;
    },
    showPWAInstallButton(): boolean {
      return (
        this.$store.getters.showPWAInstallButton &&
        this.$store.getters.layoutSizeWidth !== ('desktop' as AppLayoutSizeWidth)
      );
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
.pwa-button {
  margin-right: math.div(-$default-spacing, 2);
  margin-top: math.div(-$default-spacing, 2);
}

.home-top {
  position: relative;
  min-height: 80px;
  &__content {
    opacity: 0;
    animation: move-up 1.2s forwards;
    animation-delay: 1.8s;
    animation-timing-function: $ease-out-quint-ish;
    transform: translateY(40px);
  }
  &__logo {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: math.div($default-spacing, 2);
    animation: move-out 1.2s forwards;
    animation-delay: 1.8s;
    animation-timing-function: $ease-out-quint-ish;

    img {
      height: 100%;
      max-height: 30px;
    }
  }

  @keyframes move-up {
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }
  @keyframes move-out {
    50% {
      opacity: 0;
    }
    100% {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
}
</style>
