<template>
  <layout>
    <div class="container">
      <h1>SeriesItem</h1>
      <h1 v-if="loading">LOADING</h1>
      <div v-else>
        <h2>{{ content.title }}</h2>
        <pre>{{ seasons }}</pre>

        <h3>Episodes</h3>
        <pre>{{ episodes }}</pre>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import { contentService, SeriesEpisodes, SeasonsForSeries } from '@/services/contentService';
import { getErrorPageRouteObj } from '@/router/utils';
import Movie from '@/types/Movie';
import Series from '@/types/Series';

export default defineComponent({
  name: 'SeriesItem',
  components: {
    Layout,
  },
  data() {
    return {
      loading: true,
      content: {} as Series,
      related: [] as (Series | Movie)[],
      seasons: [] as SeasonsForSeries,
      episodes: [] as SeriesEpisodes,
    };
  },
  methods: {
    getContent() {
      this.loading = true;
      const imdbIDorTitleSlug = this.$route.params.imdbIDorTitleSlug as string;
      contentService
        .getSeriesPageContent(imdbIDorTitleSlug)
        .then((data) => {
          this.content = data.content;
          this.related = data.related;
          this.seasons = data.seasons;
          this.episodes = data.episodes;
          this.loading = false;
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            this.$router.replace(getErrorPageRouteObj(this.$route, 'notFound', 'series'));
          } else {
            this.$router.replace(getErrorPageRouteObj(this.$route, 'networkIssue'));
          }
        });
    },
  },
  created() {
    // child-router-view is using keepAlive:true,
    // so this won't get called again for the previous 10 pages if user is navigation back and forwards
    this.getContent();
  },
});
</script>
