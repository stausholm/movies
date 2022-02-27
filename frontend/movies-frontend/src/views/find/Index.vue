<template>
  <router-view />
  <!-- <child-router-view /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//import ChildRouterView from '@/router/ChildRouterView.vue';

export default defineComponent({
  name: 'FindIndex',
  components: {
    //ChildRouterView,
  },
});
</script>
