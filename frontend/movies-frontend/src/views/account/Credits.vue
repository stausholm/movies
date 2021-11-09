<template>
  <div class="">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APP_NAME } from '@/constants/SiteSettings.json';

export default defineComponent({
  name: 'Credits',
  data() {
    return {
      appName: APP_NAME,
    };
  },
});
</script>
