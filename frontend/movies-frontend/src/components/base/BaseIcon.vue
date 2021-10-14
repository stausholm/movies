<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :aria-label="label"
    role="presentation"
  >
    <title lang="en">{{ label }} icon</title>
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    label: {
      default: 'box',
      type: String,
    },
    color: {
      default: 'currentColor',
      type: String,
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
});
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  /* margin-bottom: -2px; */
}
</style>
