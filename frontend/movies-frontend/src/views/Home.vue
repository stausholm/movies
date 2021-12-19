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
      <div v-if="hasStarredContent">
        <div>
          <h2>Recommended for you</h2>
        </div>
        <div>
          <h2><router-link :to="{ name: 'Starred' }">Starred</router-link></h2>
        </div>
      </div>
      <div>
        <h2>What are you in the mood for?</h2>
        <p>lorem ipsum</p>
      </div>
      <div v-if="!hasStarredContent">
        <img src="stars.png" alt="" />
        <h2>Star something</h2>
        <p>To get recommendations right here on your homescreen</p>
      </div>
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
  computed: {
    hasStarredContent(): boolean {
      const starredIds = this.$store.getters.getStarredIds as string[];
      return starredIds.length > 0;
    },
  },
});
</script>
