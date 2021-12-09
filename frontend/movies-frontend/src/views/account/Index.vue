<template>
  <child-router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChildRouterView from '@/router/ChildRouterView.vue';

export default defineComponent({
  name: 'AccountIndex',
  components: {
    ChildRouterView,
  },
});
</script>
