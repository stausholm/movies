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

    <div class="container mt-2">
      <router-link to="/find/movies/asd123">movie test</router-link><br />
      <router-link to="/find/movies/iron-man">movie iron man test</router-link><br />
      <router-link to="/find/movies/tt3542188">movie tt3542188 test</router-link>
    </div>

    <!-- TODO: a horizontal scroller for each genre. The section header should lead to a list page -->
    <div v-for="genre in genres" :key="genre.name">
      <div class="container">
        <section-header
          :title="genre.name"
          :to="genre.preview.length === genre.totalResults ? null : genre.to"
          class="mb"
        />
      </div>
      <horizontal-scroller>
        <horizontal-scroller-item v-for="item in genre.preview" :key="item.imdbId">
          <div class="card">{{ item.imdbTitle }}</div>
        </horizontal-scroller-item>
        <horizontal-scroller-item v-if="genre.preview.length < genre.totalResults">
          <router-link :to="genre.to" class="card">see all</router-link>
        </horizontal-scroller-item>
      </horizontal-scroller>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import HeroApp from '@/components/HeroApp.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import HorizontalScroller from '@/components/HorizontalScroller.vue';
import HorizontalScrollerItem from '@/components/HorizontalScrollerItem.vue';
import { GENRES } from '@/constants/Genres';
import { RouteLocationRaw } from 'vue-router';
import Movie from '@/types/Movie';

export default defineComponent({
  name: 'Movies',
  components: {
    Layout,
    HeroApp,
    SectionHeader,
    HorizontalScroller,
    HorizontalScrollerItem,
  },
  data() {
    return {
      genres: [] as {
        name: string;
        to: RouteLocationRaw;
        preview: Movie[];
        totalResults: number;
      }[],
    };
  },
  created() {
    const genres = Object.keys(GENRES)
      .map((x) => {
        return {
          name: GENRES[x], // TODO translation
          to: {
            name: 'GenreList',
            params: {
              genre: GENRES[x],
            },
            // TODO: queryparam for only showing movies on GenreList page
          } as RouteLocationRaw,
          // TODO: call getContentByGenre
          // TODO: filter out the genres where no movies exist under
          preview: [],
          totalResults: 100,
        };
      })
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); // sort alphabetically

    this.genres = genres;
  },
});
</script>
