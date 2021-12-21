<template>
  <layout>
    <div class="container">
      <h1 class="visually-hidden">Search page</h1>
      <input type="search" name="" id="" placeholder="Search actors or titles" />
      <base-icon>
        <icon-search />
      </base-icon>

      <h2>Browse by</h2>
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

      <h2>Genres</h2>
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
import IconSearch from '@/components/icons/IconSearch.vue';
import IconTelevision from '@/components/icons/IconTelevision.vue';
import IconFilmstrip from '@/components/icons/IconFilmstrip.vue';
import IconActors from '@/components/icons/IconActors.vue';
import BlockLink from '@/components/BlockLink.vue';
import { GENRES } from '@/constants/Genres';

export default defineComponent({
  name: 'Find',
  components: {
    Layout,
    BaseIcon,
    IconSearch,
    IconTelevision,
    IconFilmstrip,
    IconActors,
    BlockLink,
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
});
</script>
