<template>
  <layout>
    <div class="container">
      <h1>GenreList {{ genre }}</h1>
      <h2 v-if="loading">LOADING</h2>
      <ul v-else>
        <li v-for="item in content" :key="item.imdbID">
          <p>{{ item.imdbTitle }}</p>
        </li>
      </ul>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import { contentService } from '@/services/contentService';
import { getErrorPageRouteObj } from '@/router/utils';
import Movie from '@/types/Movie';
import Series from '@/types/Series';

export default defineComponent({
  name: 'GenreList',
  components: {
    Layout,
  },
  data() {
    return {
      loading: true,
      genre: '',
      content: [] as (Series | Movie)[],
      totalResults: 0,
    };
  },
  methods: {
    getContent() {
      this.loading = true;

      contentService
        .getContentByGenre(this.genre)
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
    this.getContent();
  },
});
</script>
