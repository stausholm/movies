<template>
  <layout>
    <child-router-view />
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Main.vue';
import ChildRouterView from '@/router/ChildRouterView.vue';

export default defineComponent({
  name: 'WireframeIndex',
  components: {
    Layout,
    ChildRouterView,
  },
});
</script>
