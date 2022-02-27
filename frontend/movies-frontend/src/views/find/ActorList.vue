<template>
  <layout>
    <div class="container">
      <h1>ActorList</h1>
      <h2 v-if="loading">LOADING</h2>
      <ul v-else>
        <li v-for="item in content" :key="item.imdbID">
          <p>{{ item.imdbTitle }}</p>
        </li>
      </ul>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import { contentService } from '@/services/contentService';
import { getErrorPageRouteObj } from '@/router/utils';
import Movie from '@/types/Movie';
import Series from '@/types/Series';
import Episode from '@/types/Episode';

export default defineComponent({
  name: 'ActorList',
  components: {
    Layout,
  },
  data() {
    return {
      loading: true,
      content: [] as (Episode | Series | Movie)[],
    };
  },
  methods: {
    getContent() {
      this.loading = true;
      const actor = this.$route.params.actor as string;
      contentService
        .getContentByActor(actor)
        .then((data) => {
          this.content = data;
          this.loading = false;
        })
        .catch(() => {
          this.$router.replace(getErrorPageRouteObj(this.$route, 'networkIssue'));
        });
    },
  },
  created() {
    this.getContent();
  },
});
</script>
