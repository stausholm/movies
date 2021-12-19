<template>
  <layout>
    <div class="">
      <h1>Wireframe</h1>
      <p>A demo of boilerplate</p>
      <h2 class="bg-warning p">TODO: storybook instead of this wireframe stuff?</h2>
      <div class="container">
        <div class="row">
          <div class="col-12 mb-2">
            <h1>{{ fontSizeDemoText }}</h1>
            <h2>{{ fontSizeDemoText }}</h2>
            <h3>{{ fontSizeDemoText }}</h3>
            <h4>{{ fontSizeDemoText }}</h4>
            <h5>{{ fontSizeDemoText }}</h5>
            <h6>{{ fontSizeDemoText }}</h6>
            <h1 class="text-normal">{{ fontSizeDemoText }}</h1>
            <p>{{ fontSizeDemoText }}</p>
            <p class="text-small">{{ fontSizeDemoText }}</p>
            <p class="text-big">{{ fontSizeDemoText }}</p>
            <p class="text-pre-head">{{ fontSizeDemoText }}</p>
          </div>
        </div>
      </div>
      <div class="container">
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
      <div class="">
        <base-button class="" @click="alert">button</base-button>
        <base-button class="btn--primary" @click="alert">button primary</base-button>
        <base-button class="btn--rounded" @click="alert">button rounded</base-button>
        <base-button class="btn--uppercase" @click="alert">button uppercase</base-button>
        <base-button class="btn--sm" @click="alert">button sm</base-button>
        <base-button class="btn--lg" @click="alert">button lg</base-button>
        <base-button class="" @click="alert">
          button with a lot of text which is bad but oh well if that's how it's gonna be, so be it
        </base-button>
        <base-button class="" @click="alert">
          <base-icon></base-icon>
        </base-button>
        <base-button class="" @click="alert">
          <base-icon></base-icon>
          <span>icon with text</span>
        </base-button>
        <base-button class="" @click="alert">
          <span>icon with text left</span>
          <base-icon></base-icon>
        </base-button>
        <base-button class="btn--icon text-small" @click="alert">
          <base-icon></base-icon>
          <span>icon btn</span>
        </base-button>
        <base-button class="btn--text" @click="alert">button text</base-button>
        <base-button class="btn--outline btn--primary" @click="alert">
          button outline primary
        </base-button>
        <base-button class="btn--danger btn--outline" @click="alert">
          button danger outline
        </base-button>
        <base-button class="btn--danger" @click="alert">button danger</base-button>
        <base-button class="btn--link" @click="alert">button link</base-button>
        <base-button class="btn--link" disabled @click="alert">button disabled</base-button>
        <base-button class="btn" disabled @click="alert">button disabled</base-button>
        <base-button tag="span" class="btn--link" @click="alert">button span tag</base-button>
        <base-button class="btn--outline btn--text">outline text</base-button>
        <base-button class="btn--outline btn--warning">outline</base-button>
        <base-button class="btn--warning">warning</base-button>
        <base-button class="btn--text-primary">text-primary</base-button>
      </div>
      <icons />
      <button @click="toast" class="btn btn--primary mt-2 mb-2">show toast</button>
      <button @click="toastPush" class="btn btn--primary mt-2 mb-2">push toast</button>
      <button @click="removeToasts" class="btn btn--primary mt-2 mb-2">remove all toasts</button>
      <div class="ratio ratio-16x9" style="width: 200px">
        <p>test</p>
      </div>
      <div class="container container--small">
        <h1>aaaaaaaaaaa</h1>
      </div>
      <div class="container container--small">
        <div class="row">
          <div class="col">lorem</div>
          <div class="col">ipsum</div>
          <div class="col">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>
      </div>
      <div class="container container--small">
        <div class="row row--flat">
          <div class="col">lorem</div>
          <div class="col">ipsum</div>
          <!-- <div class="col-12 col-sm-6 col-lg-8">lorem</div> -->
          <div class="col">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>
      </div>
      <blockquote>This is a quote</blockquote>
      <p class="text-pre-head">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In, nostrum nisi atque ullam illum
        asperiores inventore quos consequatur nihil fugiat quam repellendus mollitia fugit ipsa
        totam, ea iste. Officia, quisquam.
      </p>
      <p class="pl-sm p-md-2">test</p>
      <div class="p theme-dark">
        <p class="text-pre-head">pre head</p>
        <h2 class="text-normal">lorem ipsum</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit incidunt quo labore
          ullam optio quas <a href="#">nulla cum itaque</a> distinctio, necessitatibus fugit
          temporibus similique a ratione suscipit nesciunt eveniet quaerat tempora?
        </p>
      </div>

      <p>{{ wow }}</p>
      <button @click="changeWow('12')">change wow</button>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus aut quas beatae, neque
        odit sit cumque tempore, ullam temporibus mollitia, aperiam aliquam. Aliquid voluptas
        possimus quisquam optio, voluptate dignissimos fuga.
      </p>
      <button @click="showStuff = !showStuff">toggle teleport</button>
      <teleport to="#teleporttarget" v-if="showStuff">
        <p>showStuff aaa {{ showStuff }}</p>
      </teleport>
      <div v-if="dummy">
        <p v-for="dum in dummy" :key="dum.title"></p>
      </div>
      <!-- <ul>
      <li v-for="video in videos" :key="video.imdbId">
        {{ video.posterUrl?.medium || 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' }}
      </li>
    </ul> -->

      <br />
      <button @click="getAveragePosterRatio">getAveragePosterRatio</button>
      <p>imageRatioPercentage: {{ imageRatioPercentage }}%</p>

      <ul>
        <li v-for="video in episodes" :key="video.imdbId">
          <img :src="'/img/posters/' + video.imdbId + '_SX600.jpg'" alt="" />
          <br />
          <br />
        </li>
      </ul>
    </div>
  </layout>
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
import Icons from '@/components/icons/All.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import Layout from '@/layouts/Main.vue';
import { ToastMutations } from '@/store/toast/mutations';
import { Toast } from '@/store/toast/types';

export default defineComponent({
  name: 'Wireframe',
  components: {
    Icons,
    BaseButton,
    BaseIcon,
    Layout,
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
      fontSizeDemoText: 'Lorem ipsum dolor sit amet',
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
    alert() {
      alert('test');
    },
    toast() {
      this.$store.commit(ToastMutations.CHANGE_TOAST, {
        content: 'test content aaaaaaaa lorem ipsum dolor sit amet lorem ipsum dolor',
        theme: 'danger',
        duration: 1000000,
      } as Toast);
    },
    toastPush() {
      this.$store.commit(ToastMutations.ADD_TOAST, {
        content: 'pushed toast' + Date.now(),
        theme: 'warning',
      } as Toast);
    },
    removeToasts() {
      this.$store.commit(ToastMutations.CLEAR_TOASTS);
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
