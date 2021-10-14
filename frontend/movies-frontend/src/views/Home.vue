<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
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
    <base-icon>
      <!-- splat is assigned to ratings below 60% positive -->
      <icon-tomato-splat />
    </base-icon>
    <base-icon>
      <!-- fresh is assigned to ratings at and above 60% positive -->
      <icon-tomato-fresh />
    </base-icon>
    <base-icon name="MoreVert" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
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

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
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
  },
});
</script>
