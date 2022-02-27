<template>
  <layout>
    <div class="container">
      <h1>MovieItem</h1>
      <h1 v-if="loading">LOADING</h1>
      <div v-else>
        <pre>{{ content.title }}</pre>

        <h2>More like this</h2>
        <pre>{{ related }}</pre>
      </div>

      <router-link to="/find/movies/asd123asd">movie 404 test</router-link>
      <router-link to="/find/movies/iron-man">movie iron man test</router-link>
      <router-link to="/find/movies/tt3542188">movie tt3542188 test</router-link>
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
  name: 'MovieItem',
  components: {
    Layout,
  },
  data() {
    return {
      loading: true,
      content: {} as Movie,
      related: [] as (Series | Movie)[],
    };
  },
  methods: {
    getContent() {
      this.loading = true;
      const imdbIDorTitleSlug = this.$route.params.imdbIDorTitleSlug as string;
      contentService
        .getMoviePageContent(imdbIDorTitleSlug)
        .then((data) => {
          this.content = data.content;
          this.related = data.related;
          this.loading = false;
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            this.$router.replace(getErrorPageRouteObj(this.$route, 'notFound', 'movie'));
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
