<template>
  <layout>
    <div class="container">
      <div class="home-top mb-2 mt-1" :class="{ 'home-top--no-animate': pageShown }">
        <div class="home-top__content d-flex align-start justify-between">
          <motd class="h2 fw-normal" :animate="false" />
          <pwa-install-button
            class="btn btn--text btn--rounded ml-1 pwa-button"
            :hideText="true"
            v-if="showPWAInstallButton"
          />
        </div>
        <div class="home-top__logo">
          <img src="@/assets/logo-big.svg" alt="" />
        </div>
      </div>
      <app-tips />
    </div>

    <div class="container" v-if="hasStarredContent">
      <section-header title="Your starred content" class="mb" :to="{ name: 'Starred' }" />
      <p class="mb-2">TODO SCROLLER</p>

      <section-header title="Recommended for you" class="mb" />
      <p class="mb-2">TODO SCROLLER</p>
    </div>

    <div class="container">
      <section-header
        title="What are you in the mood for?"
        subtitle="Action, Adventure, Action-adventure.."
        class="mb"
      />
    </div>
    <horizontal-scroller :scrollSnap="false">
      <horizontal-scroller-item>
        <span>TODO chip filters</span>
      </horizontal-scroller-item>
    </horizontal-scroller>
    <horizontal-scroller class="mb-2">
      <horizontal-scroller-item class="col-4 col-sm-3">
        <video-card :video="{ type: 'TODO' }" />
      </horizontal-scroller-item>
      <horizontal-scroller-item class="col-4 col-sm-3">
        <div>
          <button class="btn btn--primary btn--rounded">Show all -></button>
        </div>
      </horizontal-scroller-item>
    </horizontal-scroller>

    <div class="container" v-if="appLaunchCount > 2">
      <pwa-install-button-in-feed @decline="pwaDeclined" class="mb-2" />
    </div>

    <zone theme="dark" v-if="!hasStarredContent" class="mb-2">
      <div class="container container--xxs text-center mt-2 mb-2">
        <img src="@/assets/star-graphic.svg" alt="" />
        <h2 class="mt-2">Star something</h2>
        <p>To get recommendations right here on your homescreen</p>
      </div>
    </zone>

    <div class="container">
      <section-header title="Popular movies" class="mb" to="TODO list page" />
    </div>
    <horizontal-scroller class="mb-2">
      <horizontal-scroller-item class="col-4 col-sm-3">
        <video-card :video="{ type: 'TODO' }" />
      </horizontal-scroller-item>
    </horizontal-scroller>

    <div class="container">
      <section-header title="Popular shows" class="mb" to="TODO list page" />
    </div>
    <horizontal-scroller class="mb-2">
      <horizontal-scroller-item class="col-4 col-sm-3">
        <video-card :video="{ type: 'TODO' }" />
      </horizontal-scroller-item>
    </horizontal-scroller>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import PwaInstallButtonInFeed from '@/components/PwaInstallButtonInFeed.vue';
import PwaInstallButton from '@/components/PwaInstallButton.vue';
import Motd from '@/components/Motd.vue';
import AppTips from '@/components/AppTips.vue';
import { AppLayoutSizeWidth } from '@/store/app/types';
import Zone from '@/components/Zone.vue';
import { Toast } from '@/store/toast/types';
import { ToastMutations } from '@/store/toast/mutations';
import SectionHeader from '@/components/SectionHeader.vue';
import HorizontalScroller from '@/components/HorizontalScroller.vue';
import HorizontalScrollerItem from '@/components/HorizontalScrollerItem.vue';
import VideoCard from '@/components/VideoCard.vue';
import { AppMutations } from '@/store/app/mutations';

export default defineComponent({
  name: 'Home',
  components: {
    Layout,
    PwaInstallButtonInFeed,
    PwaInstallButton,
    Motd,
    AppTips,
    Zone,
    SectionHeader,
    HorizontalScroller,
    HorizontalScrollerItem,
    VideoCard,
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
    appLaunchCount(): number {
      return this.$store.getters.appLaunches;
    },
    pageShown(): number {
      return this.$store.getters.homePageShown;
    },
  },
  methods: {
    pwaDeclined() {
      this.$store.commit(ToastMutations.ADD_TOAST, {
        content:
          'Should you change your mind, you can always install the application from the settings page.',
      } as Toast);
    },
  },
  beforeUnmount() {
    this.$store.commit(AppMutations.SET_HOME_PAGE_SHOWN, true);
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

  &--no-animate {
    // home-top should only animate the very first time the user lands on the homepage after opening the app, not on consecutive navigations to the homepage during the same session
    .home-top__content {
      animation-delay: -2s;
    }
    .home-top__logo {
      display: none;
    }
  }
}
</style>
