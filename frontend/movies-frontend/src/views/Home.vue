<template>
  <layout>
    <div class="container">
      <img alt="Vue logo" src="../assets/logo.png" />
      <img class="test" alt="failing image test" src="/aaaaa.png" />
      <h1><router-link to="/wireframe">Wireframe</router-link></h1>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Layout,
  },
});
</script>
