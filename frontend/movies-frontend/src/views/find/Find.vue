<template>
  <layout>
    <div class="container">
      <h1>Find</h1>
      <input type="search" name="" id="" />
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'Find',
  components: {
    Layout,
  },
});
</script>
