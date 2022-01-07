<template>
  <div class="">
    <div class="container">
      <h1>Wireframe</h1>
      <p>A demo of boilerplate</p>
    </div>
    <div class="bg-warning">
      <div class="container">
        <h2 class="pt-1 pb-1">TODO: storybook instead of this wireframe stuff?</h2>
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

    <div class="container mt-2">
      <h2>ratio</h2>
      <div class="ratio ratio-16x9 theme-dark" style="width: 200px">
        <p>test 16:9</p>
      </div>
    </div>

    <div class="container mt-2">
      <h2>Vue3/TS</h2>
      <p>{{ wow }}</p>
      <button @click="changeWow('12')">change wow</button>

      <button @click="showStuff = !showStuff">toggle teleport</button>
      <teleport to="#teleporttarget" v-if="showStuff">
        <p>showStuff aaa {{ showStuff }}</p>
      </teleport>
      <div v-if="dummy">
        <p v-for="dum in dummy" :key="dum.title"></p>
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
        <img :src="'/img/posters/' + video.imdbId + '_SX600.jpg'" alt="" />
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
    thumbnail: 67.64734196768504,
    medium: 67.60758715673957,
    large: 67.61918247371314,
  },
  series: {
    thumbnail: 70.84101871820573,
    medium: 70.74502823443541,
    large: 70.74013393835907,
  },
  episode: {
    thumbnail: 139.10163228061094,
    medium: 139.04155065082693,
    large: 139.02263494536936,
  },
};

import { defineComponent, PropType } from 'vue';
import Episode from '@/types/Episode';
import Movie from '@/types/Movie';
import Series from '@/types/Series';
import { VIDEO_TYPES } from '@/constants/videoTypes';
import { getAverageImageRatio } from '@/utils/imageRatio';

import BlockLink from '@/components/BlockLink.vue';

export default defineComponent({
  name: 'Wireframe',
  components: {
    BlockLink,
  },
  props: {
    dummy: {
      required: false,
      type: Array as PropType<Series[]>,
    },
  },
  data() {
    return {
      wow: 'asdasd',
      numOrString: 25 as number | string,
      showStuff: true as boolean,
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
    changeWow(val: string) {
      this.wow = val;
      return val;
    },
    getAveragePosterRatio() {
      const ratio = getAverageImageRatio();
      this.imageRatioPercentage = ratio;
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
