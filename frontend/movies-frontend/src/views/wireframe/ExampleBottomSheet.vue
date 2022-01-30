<template>
  <div class="container">
    <h2>BottomSheet</h2>
    <button class="btn btn--primary" @click="sheetOpen = true">Open BottomSheet</button>
    <bottom-sheet v-if="sheetOpen" @close="sheetOpen = false">
      <p>wow</p>
    </bottom-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BottomSheet from '@/components/BottomSheet.vue';

export default defineComponent({
  name: 'ExampleBottomSheet',
  components: {
    BottomSheet,
  },
  data() {
    return {
      sheetOpen: false,
    };
  },
});
</script>
