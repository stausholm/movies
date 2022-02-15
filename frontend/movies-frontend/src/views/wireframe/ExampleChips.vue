<template>
  <div class="container">
    <h2>Chips</h2>
    <chip></chip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chip from '@/components/Chip.vue';

export default defineComponent({
  name: 'ExampleChips',
  components: {
    Chip,
  },
});
</script>
