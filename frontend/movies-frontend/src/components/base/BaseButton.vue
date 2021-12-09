<template>
  <component :is="tag" class="btn">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'button',
    },
  },
});
</script>
