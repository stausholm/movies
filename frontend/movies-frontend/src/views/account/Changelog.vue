<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <p>All notable changes to {{ appName }} are documented here.</p>
      <p>Eventually.</p>
      <p>Until then enjoy the latest 30 commits to the main branch</p>
      <ul>
        <li v-for="commit in commits" :key="commit.sha">
          {{ commit.commit.message }} @ {{ commit.commit.committer.date }}
        </li>
      </ul>

      <div class="md" v-html="md"></div>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME } from '@/constants/SiteSettings.json';
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      commits: [] as any[],
      md: changelog,
    };
  },
  created() {
    fetch('https://api.github.com/repos/stausholm/movies/commits')
      .then((res) => res.json())
      .then((data) => {
        this.commits = data;
      });
  },
});
</script>
