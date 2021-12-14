<template>
  <layout>
    <div class="container">
      <h1>Changelog</h1>
      <p>All notable changes to {{ appName }} are documented here.</p>
      <p>Eventually.</p>
      <p>Until then enjoy the latest 30 commits to the main branch</p>
      <ul>
        <li v-for="commit in commits" :key="commit.sha">
          {{ commit.commit.message }} @ {{ commit.commit.committer.date }}
        </li>
      </ul>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME } from '@/constants/SiteSettings.json';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'Changelog',
  components: {
    Layout,
  },
  data() {
    return {
      appName: APP_NAME,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      commits: [] as any[],
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
