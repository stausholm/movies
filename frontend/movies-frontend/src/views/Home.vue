<template>
  <layout>
    <div class="container">
      <base-spacer size="1" class="d-xs-none" />
      <!-- TODO: motd should only animate the very first time the user lands on the homepage after opening the app, not on consecutive navigations to the homepage during the same session -->
      <div>
        <motd class="h2 fw-normal mb-1" :animate="true" />
      </div>
      <base-card
        class="mb-2"
        :title="`Customize what you see in ${appName}`"
        headingLevel="h2"
        tags="Did you know?"
        type="tip"
      >
        <p>Add or remove favourites, adjust app colors, animations, images & more</p>
        <template #footer>
          <router-link class="btn btn--text-primary" :to="{ name: 'Account' }">
            Go to Settings
          </router-link>
          <button class="btn btn--text">Got it</button>
        </template>
      </base-card>
      <base-card
        class="mb-2"
        title="Quick Access"
        headingLevel="h2"
        tags="Did you know?"
        type="tip"
      >
        <p>Use Quick Access to get around {{ appName }} quickly. Just press:</p>
        <!-- Button will open quick access menu -->
        <button class="btn btn--primary btn--uppercase">CTRL + K</button>
      </base-card>

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
import Motd from '@/components/Motd.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import { APP_NAME } from '@/constants/SiteSettings.json';
import BaseSpacer from '@/components/base/BaseSpacer.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Layout,
    PwaInstallButtonInFeed,
    Motd,
    BaseCard,
    BaseSpacer,
  },
  data() {
    return {
      appName: APP_NAME,
    };
  },
  computed: {
    hasStarredContent(): boolean {
      const starredIds = this.$store.getters.getStarredIds as string[];
      return starredIds.length > 0;
    },
  },
});
</script>
