<template>
  <layout>
    <div class="container">
      <h1>MovieItem</h1>
      <pre>{{ content }}</pre>
      <router-link to="/find/movies/asd123asd">movie test</router-link>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'MovieItem',
  components: {
    Layout,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
});
</script>
