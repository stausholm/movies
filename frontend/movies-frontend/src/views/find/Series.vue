<template>
  <layout>
    <div class="container">
      <h1>Series</h1>
      <router-link to="/find/series/tt0185906">tt0185906</router-link>
      <router-link to="/find/series/tt1697033">tt1697033</router-link>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'Series',
  components: {
    Layout,
  },
});
</script>
