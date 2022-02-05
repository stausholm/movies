<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <p>
        The following permissions are optional. You can use {{ appName }} without them, but some
        funcitons may be limited.
      </p>
      <ul>
        <li>
          Microphone: Used to provide audio recording features for voice search on supported
          devices.
        </li>
      </ul>

      <h2>Reset permissions</h2>
      <p>
        If you've previously denied certain permissions but wish to change them, you can do so in
        your device's TODO
      </p>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import { APP_NAME } from '@/constants/SiteSettings.json';
import HeroApp from '@/components/HeroApp.vue';

export default defineComponent({
  name: 'Permissions',
  components: {
    Layout,
    HeroApp,
  },
  data() {
    return {
      appName: APP_NAME,
    };
  },
});
</script>
