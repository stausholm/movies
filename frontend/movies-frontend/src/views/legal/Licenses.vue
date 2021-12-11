<template>
  <layout>
    <div class="container">
      <h1>Licenses</h1>
      <p class="text-mono">MIT</p>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'Licenses',
  components: {
    Layout,
  },
});
</script>
