<template>
  <div class="">
    <h1>Danger Zone</h1>
    <p>
      Delete all locally stored application data. Deleting your data is a permanent and irreversible
      action. Please be sure before proceeding.
    </p>
    <button>Delete application data</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Delete',
});
</script>
