<template>
  <layout>
    <div class="container">
      <h1>GenreList {{ genre }}</h1>
      <h2 v-if="loading">LOADING</h2>
      <ul v-else>
        <li v-for="item in content" :key="item.imdbID">
          <!-- TODO: make "CardVideo" component that renders a BaseCard and makes sure correct poster css class is added, and correct url is created -->
          <router-link
            :to="{
              name: item.type === 'movie' ? 'MovieItem' : 'SeriesItem',
              params: {
                imdbIDorTitleSlug: slugify(item.imdbTitle),
              },
            }"
          >
            {{ item.imdbTitle }}
          </router-link>
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
import { slugify } from '@/utils/stringToSlug';

export default defineComponent({
  name: 'GenreList',
  components: {
    Layout,
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
    slugify(val: string) {
      return slugify(val);
    },
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
