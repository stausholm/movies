<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <p>
        <b>{{ appName }}</b> is all about Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Eius enim asperiores omnis nemo laborum cupiditate sunt ducimus, vero dignissimos porro. Id
        dolore, molestias facilis perferendis rem ipsam incidunt. A, error?
      </p>
      <p>
        <b>{{ appName }}</b> is a <i>progressive web application</i> built with <b>Vue.js</b>
      </p>
      <p>
        The codebase is open source and available on
        <a :href="appCodeUrl" class="link" target="_blank">GitHub</a>
      </p>
      <nav class="block-link-wrapper mb-2">
        <block-link :to="{ name: 'Permissions' }">Permissions</block-link>
        <block-link :to="{ name: 'Credits' }">Credits</block-link>
        <block-link :to="{ name: 'Licenses' }">Licenses</block-link>
        <block-link :to="{ name: 'PrivacyPolicy' }">Privacy Policy</block-link>
        <block-link :to="{ name: 'TOS' }">Terms of Service</block-link>
      </nav>
      <button class="btn btn--responsive btn--primary" @click="refresh">Refresh app</button>
      <p class="text-small mt">Version: {{ appVersion }}</p>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME, APP_VERSION, APP_CODE_URL } from '@/constants/SiteSettings.json';
import Layout from '@/layouts/Main.vue';
import BlockLink from '@/components/BlockLink.vue';
import HeroApp from '@/components/HeroApp.vue';

export default defineComponent({
  name: 'About',
  components: {
    Layout,
    BlockLink,
    HeroApp,
  },
  data() {
    return {
      appName: APP_NAME,
      appVersion: APP_VERSION,
      appCodeUrl: APP_CODE_URL,
    };
  },
  methods: {
    refresh(): void {
      window.location.reload();
    },
  },
});
</script>
