<template>
  <layout>
    <div class="container">
      <h1>SeriesItem</h1>
      <h1 v-if="loading">LOADING</h1>
      <div v-else>
        <h2>{{ content.imdbTitle }}</h2>
        <pre>{{ content }}</pre>

        <h2>Seasons</h2>
        <pre>{{ seasons }}</pre>
        <tabs id="series-seasons-tabs" :activeOnCreated="activeSeasonTab" v-model="activeSeasonTab">
          <tab
            v-for="season in seasons"
            :key="season.season"
            :title="season.season.toString()"
            @active="getEpisodesForSeason(season.season)"
          >
            <ol v-if="episodes.find((x) => x.season === season.season)">
              <li
                v-for="episode in episodes.find((x) => x.season === season.season).episodes"
                :key="episode.imdbId"
              >
                <router-link
                  :to="{
                    name: 'EpisodeItem',
                    params: {
                      imdbIDorTitleSlug: slugify(content.imdbTitle),
                      imdbID: episode.imdbId,
                    },
                  }"
                >
                  {{ episode.imdbTitle }}
                </router-link>
              </li>
            </ol>
            <ol v-else>
              <li v-for="i in season.episodes" :key="i">skeleton {{ i }}</li>
            </ol>
          </tab>
        </tabs>
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
import { slugify } from '@/utils/stringToSlug';
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';

export default defineComponent({
  name: 'SeriesItem',
  components: {
    Layout,
    Tabs,
    Tab,
  },
  data() {
    return {
      activeSeasonTab: 0,
      loading: true,
      content: {} as Series,
      related: [] as (Series | Movie)[],
      seasons: [] as SeasonsForSeries,
      episodes: [] as SeriesEpisodes,
    };
  },
  methods: {
    slugify(val: string) {
      return slugify(val);
    },
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
    getEpisodesForSeason(season: number) {
      if (this.episodes.find((x) => x.season === season)) {
        // already fetched the result, so don't want to fetch it again
        return;
      }

      contentService.getEpisodesForSeason(this.content.imdbId, season).then((data) => {
        // TODO: remove setTimeout after styling skeleton loaders
        setTimeout(() => {
          this.episodes.push({
            season: season,
            episodes: data,
          });
        }, 2000);
      });
    },
  },
  created() {
    this.getContent();
  },
});
</script>
