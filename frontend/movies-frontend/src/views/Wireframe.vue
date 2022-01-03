<template>
  <layout>
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
        <h2>Text</h2>
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
            <blockquote>This is a quote</blockquote>
          </div>
        </div>
      </div>
      <div class="container">
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
      <div class="container">
        <h2>Buttons</h2>
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
        <base-button class="btn--primary btn--icon-pulse btn--block" @click="alert">
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

      <div class="container">
        <h2>Toasts</h2>
        <button @click="toast" class="btn btn--primary mb-2">show toast</button>
        <button @click="toastPush" class="btn btn--primary mb-2">push toast</button>
        <button @click="removeToasts" class="btn btn--primary mb-2">remove all toasts</button>
      </div>

      <div class="container">
        <h2>Sparkles</h2>
        <sparkles>wow some text</sparkles>
        <br />
        <br />
        <sparkles :colors="['#fff']" :maxSize="30" sparkleType="random">
          <img src="a" alt="" />
        </sparkles>
      </div>

      <div class="container">
        <h2>ratio</h2>
        <div class="ratio ratio-16x9 theme-dark" style="width: 200px">
          <p>test 16:9</p>
        </div>
      </div>

      <div class="container">
        <h2>Modal</h2>
        <button @click="showModal = true" class="btn btn--primary">Show modal</button>
        <modal
          v-if="showModal"
          @close="showModal = false"
          @confirm="handleConfirm"
          confirmLabel="confirm"
          :confirmIsDestructive="false"
          :showCloseButton="false"
          title="title asdasd"
          :stackActions="false"
        >
          <p>test</p>
          <button @keyup.esc.stop="testkeyup" autofocus>test</button>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <button>another button</button>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
        </modal>
      </div>

      <div class="container">
        <h2>block links</h2>
        <nav class="block-link-wrapper">
          <block-link to="https://google.com" type="external">google.com</block-link>
          <block-link
            to="https://i.kym-cdn.com/photos/images/newsfeed/000/823/349/06f.gif"
            type="file"
            >yeee</block-link
          >
          <block-link to="/nope.zip" type="file">Some external archive</block-link>
          <block-link to="/someunknownfileextension" type="file">another file</block-link>
        </nav>
      </div>

      <div class="container">
        <h2>Form inputs</h2>
        <label for="">Text</label>
        <input v-model="inputs.text" type="text" placeholder="type text" />
        <input
          v-model="inputs.text"
          type="text"
          placeholder="type text valid"
          aria-invalid="false"
        />
        <input
          v-model="inputs.text"
          type="text"
          placeholder="type text invalid"
          aria-invalid="true"
        />
        <input v-model="inputs.text" type="text" placeholder="type text disabled" disabled />
        <input
          v-model="inputs.text"
          type="text"
          placeholder="type text disabled valid"
          disabled
          aria-invalid="false"
        />
        <input
          v-model="inputs.text"
          type="text"
          placeholder="type text disabled invalid"
          disabled
          aria-invalid="true"
        />

        <label for="">.rounded</label>
        <input v-model="inputs.text" type="text" placeholder="placeholder" class="rounded" />
        <input type="color" class="rounded" />
        <input type="file" class="rounded" />
        <select name="" id="" class="rounded">
          <option value="val">val</option>
          <option value="val val">val val</option>
          <option value="val val val">val val val</option>
        </select>

        <label for="">Other "text" inputs</label>
        <input v-model="inputs.text" type="email" placeholder="type email" />
        <input v-model="inputs.text" type="search" placeholder="type search" />
        <input v-model="inputs.number" type="number" placeholder="type number" />
        <input v-model="inputs.text" type="password" placeholder="type password" />
        <input v-model="inputs.text" type="url" placeholder="type url" />
        <input v-model="inputs.text" type="tel" placeholder="type tel" />

        <label for="">Dates</label>
        <input type="date" placeholder="placeholder" />
        <input type="datetime-local" placeholder="placeholder" />
        <input type="time" placeholder="placeholder" />
        <input type="week" placeholder="placeholder" />

        <label for="">Other</label>
        <input type="file" placeholder="placeholder" />
        <input type="range" name="" id="" />
        <input type="color" name="" id="" />
        <select name="" id="">
          <option value="val">val</option>
          <option value="val val">val val</option>
          <option value="val val val">val val val</option>
        </select>
        <textarea name="" id=""></textarea>

        <label for="">Checkbox/radio/checkbox with role="switch"</label>
        <input type="checkbox" name="" id="" />
        <input type="checkbox" name="" id="" aria-invalid="true" />
        <input type="checkbox" name="" id="" aria-invalid="false" />
        <input type="checkbox" name="" id="" role="switch" />
        <input type="checkbox" name="" id="" role="switch" aria-invalid="true" />
        <input type="checkbox" name="" id="" role="switch" aria-invalid="false" />
        <input type="radio" name="bob" id="" />
        <input type="radio" name="bob" id="" />
        <input type="radio" name="bob" id="" aria-invalid="true" />
        <input type="radio" name="bob" id="" aria-invalid="false" />

        <label for="">Base input component</label>
        <base-input
          id="testId"
          label="test label"
          type="email"
          description="this is a small helper text"
          placeholder="placeholder lorem"
          class="mb-2 mt-2"
          :hasErrors="true"
          errorMessage="Error message lorem"
          prefix=""
          suffix=".domain.com"
          icon="Filmstrip"
          v-model="inputs.text"
          data-attribute-test="asdasd"
        />
      </div>

      <div class="p-1 theme-dark">
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
import Modal from '@/components/Modal.vue';
import Sparkles from '@/components/Sparkles.vue';
import BlockLink from '@/components/BlockLink.vue';
import BaseInput from '@/components/base/BaseInput.vue';

export default defineComponent({
  name: 'Wireframe',
  components: {
    Icons,
    BaseButton,
    BaseIcon,
    Layout,
    Modal,
    Sparkles,
    BlockLink,
    BaseInput,
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
      showModal: false,
      inputs: {
        text: '',
        number: undefined,
      },
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
    handleConfirm() {
      console.log('confirmed aaaaa');
    },
    testkeyup() {
      console.log('test keyup propagation stop');
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
