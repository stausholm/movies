<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <img class="test" alt="failing image test" src="/aaaaa.png" />
    <h1><router-link to="/wireframe">Wireframe</router-link></h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
});
</script>
