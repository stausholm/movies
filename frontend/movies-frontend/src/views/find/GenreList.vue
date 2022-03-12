<template>
  <layout>
    <div class="container">
      <h1>GenreList {{ genre }}</h1>
      <h2 v-if="loading">LOADING</h2>
      <ul v-else>
        <li v-for="item in content" :key="item.imdbID" style="max-width: 200px">
          {{ item.imdbTitle }}
          <video-card :video="item" />
        </li>
      </ul>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import { contentService, GenreType } from '@/services/contentService';
import { getErrorPageRouteObj } from '@/router/utils';
import Movie from '@/types/Movie';
import Series from '@/types/Series';
import VideoCard from '@/components/VideoCard.vue';

export default defineComponent({
  name: 'GenreList',
  components: {
    Layout,
    VideoCard,
  },
  data() {
    return {
      loading: true,
      genre: '',
      contentType: 'all' as GenreType,
      content: [] as (Series | Movie)[],
      totalResults: 0,
    };
  },
  methods: {
    getContent() {
      this.loading = true;

      contentService
        .getContentByGenre(this.genre, this.contentType)
        .then((data) => {
          this.content = data.content;
          this.totalResults = data.totalResults;
          this.loading = false;
        })
        .catch(() => {
          this.$router.replace(getErrorPageRouteObj(this.$route, 'networkIssue'));
        });
    },
  },
  created() {
    this.genre = this.$route.params.genre as string;
    if (this.$route.query.type) {
      this.contentType = this.$route.query.type as GenreType;
    }
    this.getContent();
  },
});
</script>
