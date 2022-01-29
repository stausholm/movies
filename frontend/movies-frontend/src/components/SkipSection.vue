<template>
  <a :href="'#' + idFormatted" class="visually-hidden-focusable">Skip {{ name }}</a>
  <slot />
  <div class="visually-hidden-focusable" :id="idFormatted" tabindex="-1">End of {{ name }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { slugify } from '@/utils/stringToSlug';

// idea from: https://bbc.github.io/gel/components/share-tools/#gel-sharetools__end

export default defineComponent({
  name: 'SkipSection',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    idFormatted(): string {
      return slugify('section-' + this.name + '__end');
    },
  },
});
</script>
