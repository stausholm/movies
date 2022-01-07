<template>
  <layout>
    <router-view />
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
export default defineComponent({
  name: 'WireframeIndex',
  components: {
    Layout,
  },
});
</script>
