<template>
  <layout>
    <div class="container">
      <h1>Starred</h1>
      <img alt="Vue logo" src="../../assets/logo.png" />
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'Starred',
  components: {
    Layout,
  },
});
</script>
