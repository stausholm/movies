<template>
  <layout>
    <div class="container">
      <h1 class="mt-2">ShareTarget</h1>
      <div class="bg-warning p-1 mb-1">
        <p class="fw-bold m-0">
          <!-- TODO: test that webshare actually works -->
          This page should not be shown to the user. Router should handle the shared data and
          redirect to wherever needed. This page is only for dev purposes
        </p>
      </div>
      <p>The following was shared with the app:</p>
      <pre><code>{{shareData}}</code></pre>
      <router-link :to="{ name: 'Home' }" class="btn btn--primary" replace>Go home!</router-link>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import { getUrlParamValues, paramsObj } from '@/utils/getUrlParams';

export default defineComponent({
  name: 'ShareTarget',
  props: {},
  components: {
    Layout,
  },
  data() {
    return {
      shareData: null as null | paramsObj,
    };
  },
  created() {
    // NOTE: This View component is only for dev purposes. The logic handling share url params happens in router.beforeEach
    const { shared_title, shared_text, shared_url } = getUrlParamValues([
      'shared_title',
      'shared_text',
      'shared_url',
    ]);

    this.shareData = {
      shared_title,
      shared_text,
      shared_url,
    };
  },
});
</script>

<style lang="scss" scoped></style>
