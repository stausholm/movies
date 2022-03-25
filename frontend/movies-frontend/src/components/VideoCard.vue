<template>
  <base-card
    :to="url"
    type="image"
    :title="video.imdbTitle"
    :imgSources="imageSources"
    :class="['card--image-hide-title', videoClass]"
  ></base-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Video from '@/types/Video';
import BaseCard from '@/components/base/BaseCard.vue';
import { slugify } from '@/utils/stringToSlug';
import { RouteLocationRaw } from 'vue-router';
import Episode from '@/types/Episode';

export default defineComponent({
  name: 'VideoCard',
  components: {
    BaseCard,
  },
  props: {
    video: {
      type: Object as PropType<Video>,
      required: true,
    },
    sizes: {
      // maps to the sources prop for lazy-image component
      type: Array as PropType<(number | null)[]>,
    },
  },
  computed: {
    imageSources() {
      if (!this.video.posterUrl) {
        return;
      }

      const id = this.video.imdbId;

      if (this.sizes) {
        const validSizes = [100, 300, 600];
        return this.sizes.map((size) => {
          if (size) {
            if (validSizes.includes(size)) {
              return `/img/posters/${id}_SX${size}.jpg`;
            }
            console.warn(`Invalid poster size provided: ${size}. Using fallback: ${validSizes[0]}`);
            return `/img/posters/${id}_SX${validSizes[0]}.jpg`;
          }
          return size;
        });
      }

      // fallback if no sizes prop has been defined
      return [`/img/posters/${id}_SX600.jpg`];
    },
    url() {
      let url = {} as RouteLocationRaw;
      switch (this.video.type) {
        case 'movie':
          url = {
            name: 'MovieItem',
            params: {
              imdbIDorTitleSlug: slugify(this.video.imdbTitle),
            },
          };
          break;
        case 'episode':
          url = {
            name: 'EpisodeItem',
            params: {
              imdbIDorTitleSlug: (this.video as Episode).seriesId, // TODO: use slug instead of seriesId
              imdbID: this.video.imdbId,
            },
          };
          break;
        case 'series':
          url = {
            name: 'SeriesItem',
            params: {
              imdbIDorTitleSlug: slugify(this.video.imdbTitle),
            },
          };
          break;
      }
      return url;
    },
    videoClass() {
      let cssClass = '';
      switch (this.video.type) {
        case 'movie':
          cssClass = 'card--image-movie';
          break;
        case 'episode':
          cssClass = 'card--image-episode';
          break;
        case 'series':
          cssClass = 'card--image-series';
          break;
      }
      return cssClass;
    },
  },
});
</script>
