<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <div v-if="loading">loading</div>
      <div v-else-if="starredContent.length > 0" class="row">
        <div class="col-6" v-for="content in starredContent" :key="content.imdbId">
          {{ content.title }}
        </div>
      </div>
      <div v-else>
        <img src="star.png" alt="" />
        <h2>Add your favourites</h2>
        <p>
          Tap the <span class="visually-hidden">star</span>
          <base-icon width="18" height="18">
            <icon-star />
          </base-icon>
          icon on any content to add them here. You'll see all your favourited content in one place.
        </p>
        <router-link :to="{ name: 'Find' }" replace class="btn btn--primary">Explore</router-link>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import Episode from '@/types/Episode';
import Series from '@/types/Series';
import Movie from '@/types/Movie';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconStar from '@/components/icons/IconStar.vue';
import HeroApp from '@/components/HeroApp.vue';

export default defineComponent({
  name: 'Starred',
  components: {
    Layout,
    BaseIcon,
    IconStar,
    HeroApp,
  },
  computed: {
    starredContent(): (Episode | Series | Movie)[] {
      const starredIds = this.$store.getters.getStarredIds as string[];
      return (this.$store.state.content.videos as (Episode | Series | Movie)[]).filter((x) =>
        starredIds.includes(x.imdbId)
      );
    },
    loading(): boolean {
      return this.$store.state.content.loading;
    },
  },
});
</script>
