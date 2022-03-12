<template>
  <layout>
    <div class="container">
      <h1>Series</h1>
      <h1 v-if="loading">LOADING</h1>
      <div v-else>
        <ol>
          <li v-for="series in seriesList" :key="series.imdbId">
            <router-link
              :to="{
                name: 'SeriesItem',
                params: { imdbIDorTitleSlug: slugify(series.imdbTitle) },
              }"
            >
              {{ series.imdbTitle }}
            </router-link>
          </li>
        </ol>
      </div>
      <router-link to="/find/series/tt0185906">tt0185906</router-link>
      <router-link to="/find/series/tt1697033">tt1697033</router-link>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import Series from '@/types/Series';
import { contentService } from '@/services/contentService';
import { getErrorPageRouteObj } from '@/router/utils';
import { slugify } from '@/utils/stringToSlug';

export default defineComponent({
  name: 'Series',
  components: {
    Layout,
  },
  data() {
    return {
      seriesList: [] as Series[],
      loading: true,
    };
  },
  methods: {
    slugify(val: string) {
      return slugify(val);
    },
    getContent() {
      this.loading = true;
      contentService
        .getSeries()
        .then((data) => {
          this.loading = false;
          this.seriesList = data;
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            this.$router.replace(getErrorPageRouteObj(this.$route, 'notFound', 'page'));
          } else {
            this.$router.replace(getErrorPageRouteObj(this.$route, 'networkIssue'));
          }
        });
    },
  },
  created() {
    this.getContent();
  },
});
</script>
