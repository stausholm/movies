<template>
  <layout>
    <div class="container">
      <h1>Actors</h1>
      <h2 v-if="loading">LOADING</h2>
      <ul v-else class="row">
        <li v-for="actor in actors" :key="actor" class="col-12 col-sm-4">
          <router-link :to="{ name: 'ActorList', params: { actor: actor } }">
            <avatar :name="actor" :size="120" :square="true" />
            <p>{{ actor }}</p>
          </router-link>
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
import Avatar from '@/components/account/Avatar.vue';

export default defineComponent({
  name: 'Actors',
  components: {
    Layout,
    Avatar,
  },
  data() {
    return {
      loading: true,
      actors: [] as string[],
    };
  },
  methods: {
    getContent() {
      this.loading = true;
      contentService
        .getActors()
        .then((data) => {
          this.actors = data;
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
