<template>
  <layout>
    <div class="container">
      <h1>EpisodeItem</h1>
      <h1 v-if="loading">LOADING</h1>
      <div v-else>
        <span class="text-pre-head">{{ seriesInfo.imdbTitle }}</span>
        <h1>S{{ content.season }}:E{{ content.episode }} {{ content.imdbTitle }}</h1>
        <pre>{{ content }}</pre>
        <h2>Series info</h2>
        <pre>{{ seriesInfo }}</pre>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import Episode from '@/types/Episode';
import { contentService } from '@/services/contentService';
import { getErrorPageRouteObj } from '@/router/utils';

export default defineComponent({
  name: 'EpisodeItem',
  components: {
    Layout,
  },
  data() {
    return {
      loading: true,
      content: {} as Episode,
      seriesInfo: {} as { title: string; imdbTitle: string; imdbId: string },
    };
  },
  methods: {
    getContent() {
      this.loading = true;
      const imdbID = this.$route.params.imdbID as string;
      contentService
        .getEpisodePageContent(imdbID)
        .then((data) => {
          this.content = data.content;
          this.seriesInfo = data.series;
          this.loading = false;
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            this.$router.replace(getErrorPageRouteObj(this.$route, 'notFound', 'episode'));
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
