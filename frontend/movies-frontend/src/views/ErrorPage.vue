<template>
  <layout>
    <div class="container">
      <div class="error-notice">
        <h1>404</h1>
        <h2>Woah.. that wasn't supposed to happen</h2>
        <p>Looks like you requested a page that doesn't exists</p>
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
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'ErrorPage',
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
