<template>
  <layout>
    <!-- TODO: hero with fancy generic actors image -->
    <hero-app title="Actors" :background="['primary', 'fade']" :showBackButton="true">
      <template v-slot="{ title }">
        <h1 class="mb-0">{{ title }}</h1>
        <span class="text-big">Lorem ipsum dolor {{ actors.length }}</span>
      </template>
    </hero-app>
    <div class="container">
      <h4>TODO: virtual list and share button + displaymode button</h4>
      <loader
        v-if="loading"
        :size="48"
        message="Loading actors..."
        class="d-flex justify-center flex-column align-center"
      />
      <ul v-else class="row row--equal-height">
        <li v-for="actor in actors" :key="actor" class="col-6 col-xs-4 col-sm-3 actor-col">
          <router-link
            :to="{ name: 'ActorList', params: { actor: actor } }"
            class="card overflow-hide"
          >
            <avatar :name="actor" :size="120" :square="true" />
            <p class="mb-0 h4 p">{{ actor }}</p>
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
import HeroApp from '@/components/HeroApp.vue';
import Loader from '@/components/Loader.vue';

export default defineComponent({
  name: 'Actors',
  components: {
    Layout,
    Avatar,
    HeroApp,
    Loader,
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

<style lang="scss" scoped>
.actor-col {
  svg {
    width: 100%;
    height: auto;
  }
}
</style>
