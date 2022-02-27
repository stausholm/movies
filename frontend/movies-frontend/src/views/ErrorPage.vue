<template>
  <layout>
    <div class="container">
      <div class="error-notice">
        <template v-if="type === 'notFound'">
          <h1>404</h1>
          <h2>Woah.. that wasn't supposed to happen</h2>
          <p>
            Looks like you requested a <strong>{{ resource }}</strong> that doesn't exists
          </p>
        </template>
        <template v-else-if="type === 'networkIssue'">
          <h1>Uh-Oh!</h1>
          <h2>It looks like you're experiencing some network issues.</h2>
          <p>Please click the back button and try again, or return to the homepage.</p>
        </template>
        <template v-else>
          <h1>:(</h1>
          <h2>Something went wrong</h2>
          <p>We're not entirely sure what though.</p>
        </template>
        <div>
          <button
            class="btn btn--outline btn--primary mr"
            @click="$router.go(-1)"
            v-if="showGoBack"
          >
            Go back
          </button>
          <router-link :to="{ name: 'Home' }" class="btn btn--primary" replace
            >Go home!</router-link
          >
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Layout from '@/layouts/Main.vue';
import { ErrorPageResource, ErrorPageType } from '@/router/utils';

export default defineComponent({
  name: 'ErrorPage',
  props: {
    resource: {
      // type of resource that could not be found. Used with 404 errors
      type: String as PropType<ErrorPageResource>,
      default: 'page',
    },
    type: {
      type: String as PropType<ErrorPageType>,
      default: 'notFound',
      validator(val: string) {
        return ['notFound', 'networkIssue'].includes(val);
      },
    },
  },
  components: {
    Layout,
  },
  computed: {
    showGoBack(): boolean {
      return window.history.length > 1 && window.history.state.back;
    },
  },
});
</script>

<style lang="scss" scoped>
.error-notice {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20vh;
  text-align: center;

  h1 {
    //color: #cacedb;
    opacity: 0.37;
    font-size: 3.75rem;
    margin-bottom: 1.5625rem;
  }
  h2 {
    font-weight: 400;
    font-size: 1.75rem;
    margin-bottom: 0.625rem;
    //color: #3d5170;
  }
  p {
    //color: #818ea3;
    opacity: 0.67;
  }
}
</style>
