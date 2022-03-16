<template>
  <layout>
    <div class="container">
      <h1>Series</h1>
      <h1 v-if="loading">LOADING</h1>
      <div v-else>
        <ol class="row">
          <li v-for="series in seriesList" :key="series.imdbId" class="col-4 col-sm-3">
            <video-card :video="series" />
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
import VideoCard from '@/components/VideoCard.vue';

export default defineComponent({
  name: 'Series',
  components: {
    Layout,
    VideoCard,
  },
  data() {
    return {
      seriesList: [] as Series[],
      loading: true,
    };
  },
  methods: {
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
