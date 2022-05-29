<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <p class="mb-0">All notable changes to {{ appName }} are documented here.</p>
      <p class="mb-0">
        The format is based on
        <a href="https://keepachangelog.com/en/1.0.0/" rel="noopener noreferrer"
          >Keep a Changelog</a
        >
        and adheres to
        <a href="https://semver.org/spec/v2.0.0.html" rel="noopener noreferrer">
          Semantic Versioning.
        </a>
      </p>
      <p>Current version is {{ appVersion }}</p>
      <div class="changelog-md" v-html="md"></div>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME, APP_VERSION } from '@/constants/SiteSettings.json';
import Layout from '@/layouts/Main.vue';
import HeroApp from '@/components/HeroApp.vue';
import { changelog } from '@/changelog';

export default defineComponent({
  name: 'Changelog',
  components: {
    Layout,
    HeroApp,
  },
  data() {
    return {
      appName: APP_NAME,
      appVersion: APP_VERSION,
      md: changelog,
    };
  },
});
</script>
