<template>
  <div class="">
    <h1>Changelog</h1>
    <p>All notable changes to {{ appName }} are documented here</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Changelog',
  data() {
    return {
      appName: 'TODO',
    };
  },
});
</script>
