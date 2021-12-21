<template>
  <layout>
    <div class="container">
      <h1>EpisodeItem</h1>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'EpisodeItem',
  components: {
    Layout,
  },
});
</script>
