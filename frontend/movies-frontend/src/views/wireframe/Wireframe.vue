<template>
  <div class="">
    <hero-app title="Wireframe" :slim="true" />
    <div class="container">
      <p>A demo of boilerplate</p>
    </div>

    <div class="bg-warning">
      <div class="container">
        <h2 class="pt-2 pb-2 mb-0">TODO: storybook instead of this wireframe stuff?</h2>
      </div>
    </div>

    <div class="container">
      <nav class="block-link-wrapper mt-2">
        <block-link v-for="link in childRoutes" :key="link.path" :to="{ name: link.name }">{{
          link.name
        }}</block-link>
      </nav>
    </div>

    <div class="container mt-2">
      <h2>Custom error handler test</h2>
      <!-- https://vuejs.org/api/options-lifecycle.html#errorcaptured -->
      <p>
        Clicking buttons will throw a js error that app.config.errorHandler will handle in
        production. Normally a component should be able to handle it's own erros using
        errorCaptured() lifecycle hook
      </p>
      <button class="btn btn--primary mr" @click="doStuff()">call undefined function</button>
      <button class="btn btn--primary" @click="throwError">Throw error</button>
    </div>

    <div class="container mt-2">
      <h2>Tooltips</h2>
      <p>hold down your finger/mouse on the elements below for ~1s to see a tooltip</p>
      <h3 data-pushtip="this is a tip">tooltip test on text</h3>
      <button
        class="btn btn--primary"
        data-pushtip="testtesttesttesttetsetsetsetsetsetgisetgsjthgsjtghsjtghsjthg"
      >
        tooltip test 2
      </button>
    </div>

    <div class="container mt-2">
      <h2>check offline</h2>
      <p>(see console)</p>
      <button class="btn btn--primary" @click="checkOffline">trigger "checkoffline" event</button>
    </div>

    <zone theme="secondary" class="mt-2">
      <div class="container mt-2 mb-2">
        <h2>Grid</h2>
        <div class="row">
          <div class="col-2 col-sm-2 col-xs-6">
            <span class="theme-dark d-block" style="height: 200px"></span>
          </div>
          <div class="col-2 col-sm-2 col-xs-6">
            <span class="theme-dark d-block" style="height: 200px"></span>
          </div>
          <div class="col-2 col-sm-2 col-xs-6">
            <span class="theme-dark d-block" style="height: 200px"></span>
          </div>
          <div class="col-2 col-sm-2 col-xs-6">
            <span class="theme-dark d-block" style="height: 200px"></span>
          </div>
          <div class="col-2 col-sm-2 col-xs-6">
            <span class="theme-dark d-block" style="height: 200px"></span>
          </div>
          <div class="col-2 col-sm-2 col-xs-6">
            <span class="theme-dark d-block" style="height: 200px"></span>
          </div>
        </div>
      </div>
    </zone>
    <zone class="mt-2">
      <div class="container mt-2 mb-2">
        <h2>Graphics</h2>
        <div class="row row--equal-height">
          <div class="col-6 col-sm-2 col-xs-6">
            <div class="theme-tertiary p-1 d-flex align-center">
              <img src="@/assets/logo-badge-overflowing.svg" alt="" />
            </div>
          </div>
          <div class="col-6 col-sm-2 col-xs-6">
            <div class="theme-tertiary p-1 d-flex align-center">
              <img src="@/assets/logo-badge.svg" alt="" />
            </div>
          </div>
          <div class="col-6 col-sm-2 col-xs-6">
            <div class="theme-tertiary p-1 d-flex align-center">
              <img src="@/assets/logo-big.svg" alt="" />
            </div>
          </div>
          <div class="col-6 col-sm-2 col-xs-6">
            <div class="theme-tertiary p-1 d-flex align-center">
              <img src="@/assets/logo-color.svg" alt="" />
            </div>
          </div>
          <div class="col-6 col-sm-2 col-xs-6">
            <div class="theme-tertiary p-1 d-flex align-center">
              <img src="@/assets/logo.svg" alt="" />
            </div>
          </div>
          <div class="col-6 col-sm-2 col-xs-6">
            <div class="theme-tertiary p-1 d-flex align-center">
              <img src="@/assets/logo-white.svg" alt="" />
            </div>
          </div>
          <div class="col-6 col-sm-2 col-xs-6">
            <div class="theme-tertiary p-1 d-flex align-center">
              <img src="@/assets/missing-poster.svg" alt="" />
            </div>
          </div>
          <div class="col-6 col-sm-2 col-xs-6">
            <div class="theme-tertiary p-1 d-flex align-center">
              <img src="@/assets/no-results.svg" alt="" />
            </div>
          </div>
          <div class="col-6 col-sm-2 col-xs-6">
            <div class="theme-tertiary p-1 d-flex align-center">
              <img src="@/assets/quick-read-upper.svg" alt="" />
            </div>
          </div>
          <div class="col-6 col-sm-2 col-xs-6">
            <div class="theme-tertiary p-1 d-flex align-center">
              <img src="@/assets/quick-read.svg" alt="" />
            </div>
          </div>
          <div class="col-6 col-sm-2 col-xs-6">
            <div class="theme-tertiary p-1 d-flex align-center">
              <img src="@/assets/star-graphic.svg" alt="" />
            </div>
          </div>
        </div>
        <h2>Dynamic assets graphic</h2>
        <!-- https://blog.lichter.io/posts/dynamic-images-vue-nuxt/ -->
        <img :src="require(`@/assets/${'STAR-GRAPHIC.svg'.toLowerCase()}`)" alt="" width="100" />
      </div>
    </zone>

    <div class="container mt-2 mb-2">
      <h2>ratio</h2>
      <div class="ratio ratio-16x9 theme-dark" style="width: 200px">
        <p>test 16:9</p>
      </div>
    </div>

    <!-- <ul>
      <li v-for="video in videos" :key="video.imdbId">
        {{ video.posterUrl?.medium || 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' }}
      </li>
    </ul> -->

    <!-- <br />
    <button @click="getAveragePosterRatio">getAveragePosterRatio</button>
    <p>imageRatioPercentage: {{ imageRatioPercentage }}%</p>

    <ul>
      <li v-for="video in episodes" :key="video.imdbId">
        <img :src="'/img/posters/' + video.imdbId + '_SX100.jpg'" alt="" />
        <br />
        <br />
      </li>
    </ul> -->
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
const ratios = {
  movie: {
    // 148%
    thumbnail: 147.96691176470614,
    medium: 148.0551470588237,
    large: 148.02947046395445,
  },
  series: {
    // 141.75%
    thumbnail: 141.57142857142858,
    medium: 141.76190476190473,
    large: 141.7703855085414,
  },
  episode: {
    // 78.1%
    thumbnail: 78.10317460317464,
    medium: 78.1164021164021,
    large: 78.12799395250143,
  },
};

import { defineComponent } from 'vue';
import Episode from '@/types/Episode';
import Movie from '@/types/Movie';
import Series from '@/types/Series';
import { VIDEO_TYPES } from '@/constants/videoTypes';
import { getAverageImageRatio } from '@/utils/imageRatio';

import BlockLink from '@/components/BlockLink.vue';
import { checkOffline } from '@/utils/networkConnection';
import HeroApp from '@/components/HeroApp.vue';
import Zone from '@/components/Zone.vue';

export default defineComponent({
  name: 'Wireframe',
  components: {
    BlockLink,
    HeroApp,
    Zone,
  },
  data() {
    return {
      videos: [] as (Episode | Series | Movie)[],
      imageRatioPercentage: 0,
    };
  },
  computed: {
    movies(): Movie[] {
      return this.videos.filter((x): x is Movie => x.type === VIDEO_TYPES.MOVIE);
    },
    episodes(): Episode[] {
      return this.videos.filter((x): x is Episode => x.type === VIDEO_TYPES.EPISODE);
    },
    series(): Series[] {
      return this.videos.filter((x): x is Series => x.type === VIDEO_TYPES.SERIES);
    },
    childRoutes() {
      return this.$router.options.routes
        .find((route) => route.name === this.$options.name + 'Index')
        ?.children?.filter((child) => child.path !== '');
    },
  },
  methods: {
    getAveragePosterRatio() {
      const ratio = getAverageImageRatio();
      this.imageRatioPercentage = ratio;
    },
    checkOffline(): void {
      checkOffline();
    },
    throwError(): void {
      console.info('aa');
      throw new Error('Threw an error');
    },
  },
  created() {
    fetch('/db.json')
      .then((res) => res.json())
      .then((data) => {
        this.videos = data;
      });
  },
});
</script>
