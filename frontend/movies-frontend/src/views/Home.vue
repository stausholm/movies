<template>
  <layout>
    <div class="container">
      <img alt="Vue logo" src="../assets/logo.png" />
      <img class="test" alt="failing image test" src="/aaaaa.png" />
      <h1><router-link to="/wireframe">Wireframe</router-link></h1>
      <pwa-install-button-in-feed />
      <p class="mt">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat voluptatem perspiciatis
        consequatur ex non accusamus illo voluptatibus? Laborum natus distinctio, earum corrupti
        blanditiis sapiente. Autem impedit officia voluptatum. In, magni?
      </p>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import PwaInstallButtonInFeed from '@/components/PwaInstallButtonInFeed.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Layout,
    PwaInstallButtonInFeed,
  },
});
</script>
