<template>
  <layout>
    <!-- TODO: hero with fancy generic movie image -->
    <hero-app title="Movies" :background="['primary', 'fade']">
      <template v-slot="{ title }">
        <h1 class="mb-0">{{ title }}</h1>
        <span class="text-big">Thrilling content for hours</span>
      </template>
    </hero-app>
    <div class="container">
      <section-header title="Your starred movies" class="mb" />
    </div>
    <horizontal-scroller>
      <horizontal-scroller-item>
        <div class="card">a movie</div>
      </horizontal-scroller-item>
    </horizontal-scroller>

    <!-- TODO: a horizontal scroller for each genre. The section header should lead to a list page -->
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import HeroApp from '@/components/HeroApp.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import HorizontalScroller from '@/components/HorizontalScroller.vue';
import HorizontalScrollerItem from '@/components/HorizontalScrollerItem.vue';

export default defineComponent({
  name: 'Movies',
  components: {
    Layout,
    HeroApp,
    SectionHeader,
    HorizontalScroller,
    HorizontalScrollerItem,
  },
});
</script>
