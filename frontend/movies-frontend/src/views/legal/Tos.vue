<template>
  <layout>
    <hero-app :showBackButton="true" :slim="true" />
    <div class="container">
      <p class="text-mono">¯\_(ツ)_/¯ Have fun!</p>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import HeroApp from '@/components/HeroApp.vue';

export default defineComponent({
  name: 'TOS',
  components: {
    Layout,
    HeroApp,
  },
});
</script>
