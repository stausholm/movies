<template>
  <div>TODO {{ position }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { clickRegion } from '@/utils/clickRegion';

export default defineComponent({
  name: 'ContextMenu',
  props: {
    actions: {
      type: Array,
      required: true,
    },
    event: {
      required: true,
    },
  },
  data() {
    return {
      position: clickRegion(this.event),
    };
  },
});
</script>
