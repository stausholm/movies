<template>
  <layout>
    <base-spacer size="4" />
    <h1 class="visually-hidden">Search page</h1>
    <div class="container position-sticky top-0 pt pb sticky-search">
      <search-bar
        placeholder="Search actors or titles"
        @error="handleSearchError"
        @search="handleSearchString"
        @suggestion="handleSuggestion"
      />
    </div>
    <div class="container">
      <h2 class="mt-2">Browse by</h2>
      <div class="row">
        <div class="col-6 col-sm-4">
          <router-link :to="{ name: 'Movies' }" class="btn btn--icon btn--block text-small">
            <base-icon>
              <icon-filmstrip />
            </base-icon>
            <span>Movies</span>
          </router-link>
        </div>
        <div class="col-6 col-sm-4">
          <router-link :to="{ name: 'Series' }" class="btn btn--icon btn--block text-small">
            <base-icon>
              <icon-television />
            </base-icon>
            <span>Series</span>
          </router-link>
        </div>
        <div class="col-6 col-sm-4">
          <router-link :to="{ name: 'Actors' }" class="btn btn--icon btn--block text-small">
            <base-icon>
              <icon-actors />
            </base-icon>
            <span>Actors</span>
          </router-link>
        </div>
      </div>

      <h2 class="mt-2" id="genrelist">Genres</h2>
      <!-- TODO: rendering this list makes route navigation to this route slower? -->
      <nav class="block-link-wrapper">
        <block-link
          v-for="genre in genresFormatted"
          :key="genre.name"
          :to="genre.to"
          :small="true"
          >{{ genre.name }}</block-link
        >
      </nav>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import IconTelevision from '@/components/icons/IconTelevision.vue';
import IconFilmstrip from '@/components/icons/IconFilmstrip.vue';
import IconActors from '@/components/icons/IconActors.vue';
import BlockLink from '@/components/BlockLink.vue';
import SearchBar from '@/components/SearchBar.vue';
import { GENRES } from '@/constants/Genres';
import { checkOffline } from '@/utils/networkConnection';
import BaseSpacer from '@/components/base/BaseSpacer.vue';

export default defineComponent({
  name: 'Find',
  components: {
    Layout,
    BaseIcon,
    IconTelevision,
    IconFilmstrip,
    IconActors,
    BlockLink,
    SearchBar,
    BaseSpacer,
  },
  computed: {
    genresFormatted() {
      return Object.keys(GENRES)
        .map((x) => {
          return {
            name: GENRES[x] as string, // TODO translation
            to: {
              name: 'GenreList',
              params: {
                genre: 'TODO',
              },
              // TODO: genre as route param / prop. figure out how to and best practice
            },
          };
        })
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); // sort alphabetically
    },
  },
  methods: {
    handleSearchError(err: unknown): void {
      console.log('AN ERROR IN SEARCH', err);

      // if we're not offline, something is wrong with the searchApi
      checkOffline();
    },
    handleSearchString(query: string): void {
      console.log('searched for string', query);

      // a normal usecase for this is when the user does not click on a permalink suggestion but submits the searchform with whatever their searchquery is.
      // in that case we would want to reroute the user to a searchresults page
      this.$router.push({ name: 'SearchResults', query: { q: query } });
    },
    handleSuggestion(suggestion: Record<string, unknown>): void {
      console.log('clicked suggestion', suggestion);
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/design/variables/index.scss';
@import '@/design/mixins/index.scss';

.sticky-search {
  z-index: 1;
  background-color: $body-bg;
}
</style>
