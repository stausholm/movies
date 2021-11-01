<template>
  <div class="">
    <h1>Wireframe</h1>
    <p>A demo of boilerplate</p>

    <base-icon>
      <icon-more-vert />
    </base-icon>
    <base-icon>
      <icon-install />
    </base-icon>
    <base-icon>
      <icon-account-circle />
    </base-icon>
    <base-icon>
      <icon-actors />
    </base-icon>
    <base-icon>
      <icon-arrow-up />
    </base-icon>
    <base-icon>
      <icon-arrow-right />
    </base-icon>
    <base-icon>
      <icon-arrow-left />
    </base-icon>
    <base-icon>
      <icon-arrow-down />
    </base-icon>
    <base-icon>
      <icon-close />
    </base-icon>
    <base-icon>
      <icon-filmstrip />
    </base-icon>
    <base-icon>
      <icon-home />
    </base-icon>
    <base-icon>
      <icon-search />
    </base-icon>
    <base-icon>
      <icon-star />
    </base-icon>
    <base-icon>
      <icon-star-filled />
    </base-icon>
    <base-icon>
      <icon-television />
    </base-icon>
    <base-icon>
      <icon-video-library />
    </base-icon>
    <base-icon>
      <icon-warning-triangle />
    </base-icon>
    <base-icon>
      <icon-error-circle />
    </base-icon>
    <base-icon>
      <icon-info-circle />
    </base-icon>
    <base-icon>
      <icon-settings />
    </base-icon>
    <base-icon>
      <icon-check />
    </base-icon>
    <base-icon>
      <icon-chevron-right />
    </base-icon>
    <base-icon>
      <icon-chevron-left />
    </base-icon>
    <base-icon>
      <icon-chevron-up />
    </base-icon>
    <base-icon>
      <icon-chevron-down />
    </base-icon>
    <base-icon>
      <icon-clock />
    </base-icon>
    <base-icon>
      <icon-delete />
    </base-icon>
    <base-icon>
      <icon-external-link />
    </base-icon>
    <base-icon>
      <icon-sort />
    </base-icon>
    <base-icon>
      <icon-grid-view />
    </base-icon>
    <base-icon>
      <icon-list-view />
    </base-icon>
    <base-icon>
      <icon-share />
    </base-icon>
    <base-icon>
      <icon-github />
    </base-icon>
    <base-icon>
      <icon-i-m-d-b />
    </base-icon>

    <!-- splat is assigned to ratings below 60% positive -->
    <base-icon>
      <icon-tomato-splat />
    </base-icon>

    <!-- fresh is assigned to ratings at and above 60% positive -->
    <base-icon>
      <icon-tomato-fresh />
    </base-icon>

    <button @click="showAltIcon = !showAltIcon">toggle alt icon</button>
    <base-icon transition="scale">
      <icon-github v-if="showAltIcon" />
      <icon-i-m-d-b v-else />
    </base-icon>
    <base-icon></base-icon>
    <base-icon>
      <icon-youtube />
    </base-icon>
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
      asperiores inventore quos consequatur nihil fugiat quam repellendus mollitia fugit ipsa totam,
      ea iste. Officia, quisquam.
    </p>
    <p class="pl-sm p-md-2">test</p>
    <div class="p theme-dark">
      <p class="text-pre-head">pre head</p>
      <h2 class="text-normal">lorem ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit incidunt quo labore ullam
        optio quas <a href="#">nulla cum itaque</a> distinctio, necessitatibus fugit temporibus
        similique a ratione suscipit nesciunt eveniet quaerat tempora?
      </p>
    </div>

    <p>{{ wow }}</p>
    <button @click="changeWow('12')">change wow</button>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus aut quas beatae, neque odit
      sit cumque tempore, ullam temporibus mollitia, aperiam aliquam. Aliquid voluptas possimus
      quisquam optio, voluptate dignissimos fuga.
    </p>
    <button @click="showStuff = !showStuff">toggle teleport</button>
    <teleport to="#teleporttarget" v-if="showStuff">
      <p>showStuff aaa {{ showStuff }}</p>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconMoreVert from '@/components/icons/IconMoreVert.vue';
import IconInstall from '@/components/icons/IconInstall.vue';
import IconAccountCircle from '@/components/icons/IconAccountCircle.vue';
import IconActors from '@/components/icons/IconActors.vue';
import IconArrowDown from '@/components/icons/IconArrowDown.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import IconArrowUp from '@/components/icons/IconArrowUp.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconFilmstrip from '@/components/icons/IconFilmstrip.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconStar from '@/components/icons/IconStar.vue';
import IconStarFilled from '@/components/icons/IconStarFilled.vue';
import IconTelevision from '@/components/icons/IconTelevision.vue';
import IconVideoLibrary from '@/components/icons/IconVideoLibrary.vue';
import IconWarningTriangle from '@/components/icons/IconWarningTriangle.vue';
import IconErrorCircle from '@/components/icons/IconErrorCircle.vue';
import IconInfoCircle from '@/components/icons/IconInfoCircle.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconChevronRight from '@/components/icons/IconChevronRight.vue';
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue';
import IconChevronUp from '@/components/icons/IconChevronUp.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconExternalLink from '@/components/icons/IconExternalLink.vue';
import IconSort from '@/components/icons/IconSort.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconGridView from '@/components/icons/IconGridView.vue';
import IconListView from '@/components/icons/IconListView.vue';
import IconShare from '@/components/icons/IconShare.vue';
import IconGithub from '@/components/icons/IconGithub.vue';
import IconIMDB from '@/components/icons/IconIMDB.vue';
import IconTomatoSplat from '@/components/icons/IconTomatoSplat.vue';
import IconTomatoFresh from '@/components/icons/IconTomatoFresh.vue';
import IconYoutube from '@/components/icons/IconYoutube.vue';

export default defineComponent({
  name: 'Wireframe',
  components: {
    BaseIcon,
    IconMoreVert,
    IconInstall,
    IconAccountCircle,
    IconActors,
    IconArrowUp,
    IconArrowDown,
    IconArrowLeft,
    IconArrowRight,
    IconClose,
    IconFilmstrip,
    IconHome,
    IconSearch,
    IconStar,
    IconStarFilled,
    IconTelevision,
    IconVideoLibrary,
    IconErrorCircle,
    IconWarningTriangle,
    IconInfoCircle,
    IconSettings,
    IconCheck,
    IconChevronRight,
    IconChevronLeft,
    IconChevronUp,
    IconChevronDown,
    IconExternalLink,
    IconSort,
    IconDelete,
    IconClock,
    IconGridView,
    IconListView,
    IconShare,
    IconGithub,
    IconIMDB,
    IconTomatoSplat,
    IconTomatoFresh,
    IconYoutube,
  },
  data() {
    return {
      showAltIcon: false,
      wow: 'asdasd',
      numOrString: 25 as number | string,
      showStuff: true as boolean,
    };
  },
  computed: {},
  methods: {
    changeWow(val: string) {
      this.wow = val;
      return val;
    },
  },
});
</script>
