<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <p>
        {{ appName }} uses some awesome free resources in order to look and function the way it does
      </p>
      <ul>
        <li>XX</li>
        <li>YY</li>
        <li>ZZ</li>
      </ul>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME } from '@/constants/SiteSettings.json';
import Layout from '@/layouts/Main.vue';
import HeroApp from '@/components/HeroApp.vue';

export default defineComponent({
  name: 'Credits',
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
