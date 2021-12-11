<template>
  <layout>
    <div class="container">
      <h1>Credits</h1>
      <p>
        {{ appName }} uses some awesome free resources in order to look and function the way it does
      </p>
      <ul>
        <li>XX</li>
        <li>YY</li>
        <li>ZZ</li>
      </ul>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME } from '@/constants/SiteSettings.json';
import Layout from '@/layouts/Main.vue';

export default defineComponent({
  name: 'Credits',
  components: {
    Layout,
  },
  data() {
    return {
      appName: APP_NAME,
    };
  },
});
</script>
