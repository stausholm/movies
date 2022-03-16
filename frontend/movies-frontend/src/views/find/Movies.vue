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
      <horizontal-scroller-item class="col-4">
        <div class="card">a movie</div>
      </horizontal-scroller-item>
    </horizontal-scroller>

    <div class="container mt-2">
      <router-link to="/find/movies/asd123">movie test</router-link><br />
      <router-link to="/find/movies/iron-man">movie iron man test</router-link><br />
      <router-link to="/find/movies/tt3542188">movie tt3542188 test</router-link>
    </div>

    <!-- TODO: a horizontal scroller for each genre. The section header should lead to a list page -->
    <div v-for="genre in genres" :key="genre.name" class="mb-2">
      <div class="container">
        <section-header
          :title="genre.name"
          :to="genre.preview.length === genre.totalResults ? null : genre.to"
          class="mb"
        />
      </div>
      <horizontal-scroller>
        <horizontal-scroller-item
          v-for="item in genre.preview"
          :key="item.imdbId"
          class="col-4 col-sm-3"
        >
          <video-card :video="item" />
        </horizontal-scroller-item>
        <horizontal-scroller-item
          v-if="genre.preview.length < genre.totalResults"
          class="col-4 col-sm-3"
        >
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
import { GenreType, contentService } from '@/services/contentService';
import VideoCard from '@/components/VideoCard.vue';

export default defineComponent({
  name: 'Movies',
  components: {
    Layout,
    HeroApp,
    SectionHeader,
    HorizontalScroller,
    HorizontalScrollerItem,
    VideoCard,
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
  async created() {
    const genres = Object.keys(GENRES);
    const genrePreviews = await Promise.all(
      genres.map((x) => contentService.getContentByGenre(GENRES[x], 'movie', 7))
    );
    const genresFormatted = genres
      .map((x, index) => {
        return {
          name: GENRES[x], // TODO translation
          to: {
            name: 'GenreList',
            params: {
              genre: GENRES[x],
            },
            query: {
              ...this.$route.query,
              type: 'movie' as GenreType,
            },
          } as RouteLocationRaw,
          preview: genrePreviews[index].content as Movie[],
          totalResults: genrePreviews[index].totalResults,
        };
      })
      .filter((x) => x.preview.length > 0) // filter out the genres where no movies exist under
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); // sort alphabetically

    this.genres = genresFormatted;
  },
});
</script>
