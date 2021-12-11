<template>
  <div :class="sizeClass" aria-hidden="true"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type SpacerSize = 0 | 1 | 2 | null | undefined | '' | '0' | '1' | '2';

export default defineComponent({
  props: {
    size: {
      default: '',
      type: [String, Number, null, undefined] as PropType<SpacerSize>,
    },
  },
  computed: {
    sizeClass(): string {
      const num = this.size;
      if (
        num === '' ||
        num === null ||
        num === undefined ||
        (typeof num === 'number' && isNaN(num))
      ) {
        return 'pt';
      }

      return `pt-${num}`;
    },
  },
});
</script>
