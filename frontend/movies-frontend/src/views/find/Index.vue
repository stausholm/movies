<template>
  <child-router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChildRouterView from '@/router/ChildRouterView.vue';

// TODO: use different animations for child router views under /find

export default defineComponent({
  name: 'FindIndex',
  components: {
    ChildRouterView,
  },
});
</script>
