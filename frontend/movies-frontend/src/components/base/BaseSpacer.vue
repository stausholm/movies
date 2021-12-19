<template>
  <div :style="{ height: height }" class="spacer" aria-hidden="true"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    size: {
      default: 1,
      type: [String, Number],
    },
    defaultSpacing: {
      type: [String, Number],
      default: 16, // same as scss $default-spacing
    },
  },
  computed: {
    height(): string {
      const num = parseFloat(this.size.toString());
      if (isNaN(num)) {
        return this.defaultSpacing + 'px';
      }

      return (this.defaultSpacing as number) * num + 'px';
    },
  },
});
</script>
